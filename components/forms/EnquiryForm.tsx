"use client";
import {
  useEffect,
  useState,
  useRef,
  type CSSProperties,
  type FormEvent,
} from "react";
import type { Puppy } from "@/types";
import { LetterDelivery } from "./LetterDelivery";

type LetterPhase = "writing" | "sealing" | "posting" | "sent";

export function EnquiryForm({
  puppy,
  choices = [],
  letter = false,
}: {
  puppy?: Puppy;
  choices?: Puppy[];
  letter?: boolean;
}) {
  const [pending, setPending] = useState(false),
    [success, setSuccess] = useState(false),
    [errors, setErrors] = useState<Record<string, string>>({}),
    [failure, setFailure] = useState("");
  const key = useRef<string | null>(null);
  const request = useRef<AbortController | null>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const [phase, setPhase] = useState<LetterPhase>("writing");

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    if (phase !== "sealing" && phase !== "posting") return;
    const timer = window.setTimeout(
      () => setPhase(phase === "sealing" ? "posting" : "sent"),
      phase === "sealing" ? 850 : 1150,
    );
    return () => clearTimeout(timer);
  }, [phase]);
  useEffect(() => {
    if (phase === "sent" || success) resultHeading.current?.focus();
  }, [phase, success]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (request.current || phase !== "writing") return;
    const controller = new AbortController();
    request.current = controller;
    setFailure("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const { enquirySchema } = await import("@/lib/validation");
      if (controller.signal.aborted) return;
      const parsed = enquirySchema.safeParse({
        ...data,
        puppyId: puppy?.id || data.puppyId,
        sourcePage: location.pathname,
      });
      if (!parsed.success) {
        const issues: Record<string, string> = {};
        for (const issue of parsed.error.issues)
          issues[String(issue.path[0])] = issue.message;
        setErrors(issues);
        form
          .querySelector<HTMLElement>(
            `[name="${String(parsed.error.issues[0].path[0])}"]`,
          )
          ?.focus();
        return;
      }

      setErrors({});
      setPending(true);
      key.current ??= crypto.randomUUID();
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, idempotencyKey: key.current }),
        signal: controller.signal,
      });
      const result = await res.json();
      if (!res.ok || !result.success)
        throw new Error(
          result.message || "Unable to save your enquiry. Please try again.",
        );
      if (letter) {
        setPhase(
          matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "sent"
            : "sealing",
        );
      } else {
        setSuccess(true);
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setFailure(
          err instanceof Error
            ? err.message
            : "Unable to save your enquiry. Please try again.",
        );
      }
    } finally {
      request.current = null;
      if (!controller.signal.aborted) setPending(false);
    }
  }

  function field(
    name: string,
    label: string,
    type = "text",
    required = false,
    placeholder = "",
  ) {
    const widths: Record<string, string> = {
      name: "16ch",
      phone: "15ch",
      email: "20ch",
      area: "13ch",
    };
    return (
      <span
        className={letter ? "tp-blank" : "form-field"}
        style={
          letter ? ({ "--size": widths[name] } as CSSProperties) : undefined
        }
      >
        <label className={letter ? "sr-only" : ""} htmlFor={"enquiry-" + name}>
          {label}
          {required ? " *" : ""}
        </label>
        <input
          id={"enquiry-" + name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          maxLength={name === "name" ? 100 : 160}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? "error-" + name : undefined}
          autoComplete={
            name === "name"
              ? "name"
              : name === "phone"
                ? "tel"
                : name === "email"
                  ? "email"
                  : "address-level2"
          }
        />
        {errors[name] && (
          <span className="field-error" role="alert" id={"error-" + name}>
            {errors[name]}
          </span>
        )}
      </span>
    );
  }
  if (success || phase === "sent")
    return (
      <section className={letter ? "tp-post__sent" : "tp-paper"} role="status">
        {letter && <LetterDelivery sent />}
        <h3 className="font-plush text-2xl" ref={resultHeading} tabIndex={-1}>
          Demo enquiry saved
        </h3>
        <p>
          Your details were stored in this assessment application. Nothing was
          sent to the reference business.
        </p>
        <button
          className="btn btn-ghost mt-6"
          onClick={() => {
            key.current = null;
            setSuccess(false);
            setPhase("writing");
          }}
        >
          Write another enquiry
        </button>
      </section>
    );
  const form = (
    <form
      className={letter ? "tp-letterform" : "enquiry-form"}
      onSubmit={submit}
      inert={phase !== "writing"}
      aria-busy={pending}
      noValidate
    >
      {!letter && (
        <p className="demo-form-note">
          Assessment demo · Use fictional details only.
        </p>
      )}
      {letter ? (
        <>
          <span className="tp-letter__stamp" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="36" height="36" fill="currentColor">
              <ellipse
                cx="15"
                cy="29"
                rx="5.5"
                ry="7.5"
                transform="rotate(-35 15 29)"
              />
              <ellipse
                cx="24"
                cy="18"
                rx="5.5"
                ry="8"
                transform="rotate(-15 24 18)"
              />
              <ellipse
                cx="40"
                cy="18"
                rx="5.5"
                ry="8"
                transform="rotate(15 40 18)"
              />
              <ellipse
                cx="49"
                cy="29"
                rx="5.5"
                ry="7.5"
                transform="rotate(35 49 29)"
              />
              <path d="M32 30c-8 0-17 9-17 16 0 6 5 9 10 7 3-1 5-2 7-2s4 1 7 2c5 2 10-1 10-7 0-7-9-16-17-16Z" />
            </svg>
          </span>
          <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>
          <div className="tp-letterform__line">
            my name is {field("name", "Your name", "text", true)}, and you can
            reach me on{" "}
            {field(
              "phone",
              "Phone or WhatsApp",
              "tel",
              true,
              "+971 50 123 4567",
            )}{" "}
            or by email at {field("email", "Email", "email", false, "optional")}
            .
          </div>
          <div className="tp-letterform__line">
            I live in{" "}
            {field("area", "Your area", "text", false, "e.g. Dubai Marina")},
            and I’m curious about{" "}
            <span className="tp-blank tp-blank--select">
              <label className="sr-only" htmlFor="puppy-choice">
                Puppy
              </label>
              <select id="puppy-choice" name="puppyId">
                <option value="">any puppy (not sure yet)</option>
                {choices.map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name} ({p.breed}, {p.gender.toLowerCase()})
                  </option>
                ))}
              </select>
            </span>
            .
          </div>
        </>
      ) : (
        <div className="form-grid">
          {field("name", "Your name", "text", true)}
          {field("phone", "Phone or WhatsApp", "tel", true, "+971 50 123 4567")}
          {field("email", "Email (optional)", "email")}
          {field(
            "area",
            "Your area (optional)",
            "text",
            false,
            "e.g. Dubai Marina",
          )}
        </div>
      )}
      <label
        className={letter ? "sr-only" : "form-label"}
        htmlFor="enquiry-message"
      >
        Message (optional)
      </label>
      <textarea
        className={letter ? "tp-letterform__note" : ""}
        id="enquiry-message"
        name="message"
        maxLength={3000}
        rows={4}
        placeholder="Anything else you’d like to tell us…"
        defaultValue={
          puppy
            ? `Hi! I'd love to ${puppy.status === "adopted" ? "find a puppy similar to" : "know more about"} ${puppy.name} (${puppy.breed}).`
            : ""
        }
      />
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {failure && (
        <p role="alert" className="field-error">
          {failure}
        </p>
      )}
      {letter ? (
        <>
          <div className="tp-letterform__sign">
            <p className="font-scrawl">with love, a future puppy parent</p>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={pending}
            >
              {pending ? "Saving…" : "Post my letter"}
            </button>
          </div>
          <p className="demo-letter-note">
            Assessment demo · Use fictional details only.
          </p>
        </>
      ) : (
        <button
          className="btn btn-primary mt-6"
          type="submit"
          disabled={pending}
        >
          {pending ? "Saving…" : "Send enquiry"}
        </button>
      )}
    </form>
  );
  return letter ? (
    <div className="tp-post" data-phase={phase}>
      {form}
      {phase !== "writing" && <LetterDelivery />}
    </div>
  ) : (
    form
  );
}
