export default function Stars({ rating = 5, fill = "#E07B3C", className = "" }: { rating?: number; fill?: string; className?: string }) {
  return (
    <span role="img" aria-label={`${rating} de 5 estrellas`} className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6L10 15l-5.3 3 1.1-6L1.4 7.8l6-.8z"
            fill={i < rating ? fill : "currentColor"}
            opacity={i < rating ? 1 : 0.25}
          />
        </svg>
      ))}
    </span>
  );
}
