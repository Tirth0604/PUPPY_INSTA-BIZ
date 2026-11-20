function Mailbox({ sent = false }: { sent?: boolean }) {
  return (
    <svg
      viewBox={sent ? "0 0 200 150" : "0 0 200 260"}
      className={sent ? "tp-post__box tp-post__box--sent" : "tp-post__box"}
      aria-hidden="true"
    >
      <g transform={sent ? "translate(0 -55)" : undefined}>
        <rect
          x="86"
          y="158"
          width="28"
          height={sent ? "43" : "97"}
          rx="2"
          fill="#5a3a28"
          stroke="#2a170e"
          strokeWidth="4"
        />
        <path
          d="M30 72a70 54 0 0 1 140 0v100H30Z"
          fill="#c2622b"
          stroke="#2a170e"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <rect x="58" y="88" width="84" height="14" rx="7" fill="#2a170e" />
        <path
          d="M49 131h103"
          stroke="#2a170e"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".3"
        />
        <g className={sent ? undefined : "tp-post__flag"}>
          <path
            d="M170 120V58"
            stroke="#2a170e"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M170 58h22v17h-22Z"
            fill="#f2be6b"
            stroke="#2a170e"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}

export function LetterDelivery({ sent = false }: { sent?: boolean }) {
  if (sent) return <Mailbox sent />;
  return (
    <div className="tp-post__scene" aria-hidden="true">
      <svg viewBox="0 0 160 112" className="tp-post__envelope">
        <rect
          x="4"
          y="17"
          width="152"
          height="91"
          rx="6"
          fill="#fffdf8"
          stroke="#2a170e"
          strokeWidth="4"
        />
        <path
          d="M7 104 64 60m89 44-57-44"
          fill="none"
          stroke="#2a170e"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="tp-post__flap"
          d="M6 21 80 73l74-52Z"
          fill="#fbe3b4"
          stroke="#2a170e"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle
          cx="80"
          cy="73"
          r="10"
          fill="#a24a1a"
          stroke="#2a170e"
          strokeWidth="3"
        />
      </svg>
      <Mailbox />
    </div>
  );
}
