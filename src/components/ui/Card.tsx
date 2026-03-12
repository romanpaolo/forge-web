export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-forge-graphite/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 ${className}`}>
      {children}
    </div>
  );
}
