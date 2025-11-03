export default function Mascotte({ className = "" }: { className?: string }){
  return (
    <img src="/assets/luma.svg" alt="Luma" className={`animate-floaty drop-shadow ${className}`} />
  );
}
