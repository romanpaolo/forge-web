export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-forge-white/5 text-forge-smoke px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] inline-block font-[family-name:var(--font-mono)]">
      {children}
    </span>
  );
}
