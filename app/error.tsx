"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="gutter empty-page">
      <h1 className="font-plush text-big">Something went wrong</h1>
      <p>Please try again.</p>
      <button className="btn btn-primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
