export default function PipeArt() {
  return (
    <svg viewBox="0 0 480 480" className="h-full w-full" role="img" aria-label="Ilustración de tuberías de cobre con una válvula">
      <g fill="none" strokeLinejoin="round">
        <path d="M30 90 H230 a40 40 0 0 1 40 40 V250 a40 40 0 0 0 40 40 H450" stroke="#E07B3C" strokeWidth="34" />
        <path d="M30 90 H230 a40 40 0 0 1 40 40 V250 a40 40 0 0 0 40 40 H450" stroke="#F6B88F" strokeWidth="6" transform="translate(0,-8)" opacity=".6" />
        <path d="M30 420 H150 a40 40 0 0 0 40 -40 V330" stroke="#53697A" strokeWidth="26" />
        <path d="M270 140 V210" stroke="#0E2433" strokeWidth="0" />
      </g>
      <g fill="#933F13">
        <rect x="14" y="66" width="22" height="48" rx="4" />
        <rect x="430" y="266" width="22" height="48" rx="4" />
        <rect x="259" y="196" width="22" height="30" rx="3" opacity="0" />
      </g>
      <g transform="translate(270 190)">
        <rect x="-22" y="-26" width="44" height="52" rx="8" fill="#933F13" />
        <rect x="-5" y="-60" width="10" height="36" fill="#cfd9df" />
        <circle cx="0" cy="-66" r="30" fill="none" stroke="#cfd9df" strokeWidth="8" />
        <path d="M-30 -66 H30 M0 -96 V-36" stroke="#cfd9df" strokeWidth="6" />
      </g>
      <g fill="#8FD0EA">
        <path d="M110 330 c-14 22 -14 36 0 36 s14 -14 0 -36z" opacity=".9" />
        <path d="M122 380 c-9 14 -9 24 0 24 s9 -10 0 -24z" opacity=".6" />
      </g>
    </svg>
  );
}
