// Stand-in for photography. Replace with <Image src="/your-photo.jpg" ... /> when you have real photos.
export default function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink to-[#235773] ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
        <defs>
          <pattern id="pp" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="32" stroke="#fff" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pp)" />
      </svg>
      <span className="absolute bottom-3 left-4 text-sm text-white/80">{label}</span>
    </div>
  );
}
