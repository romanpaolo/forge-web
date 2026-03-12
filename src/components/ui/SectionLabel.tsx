export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-forge-orange/10 text-forge-orange px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-widest inline-block">
      {children}
    </span>
  );
}
