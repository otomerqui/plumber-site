// Stand-in for photography. Replace with <Image src="/your-photo.jpg" ... /> when you have real photos.
export default function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <>
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink to-[#235773] ${className}`}
    >
      
      <img src="/porque-nosotros.webp" className="w-full h-full object-cover"/>
    </div>
    
    </>
  );
}
