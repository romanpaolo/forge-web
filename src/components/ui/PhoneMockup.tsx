export default function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[280px] rounded-[2.5rem] border-4 border-forge-graphite bg-forge-iron p-4 shadow-2xl">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-forge-graphite rounded-b-2xl" />
      {/* Screen */}
      <div className="mt-6 rounded-2xl bg-forge-steel overflow-hidden min-h-[400px]">
        {children}
      </div>
      {/* Home indicator */}
      <div className="mx-auto mt-4 w-32 h-1 rounded-full bg-forge-graphite" />
    </div>
  );
}
