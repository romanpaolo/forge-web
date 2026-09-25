// A caller's all-sides padding (className "p-6", "p-5", "p-4") REPLACES the
// default p-8. Both used to be emitted, and Tailwind v4 writes p-8 after p-6
// in the stylesheet, so every padding override was dead: /brand and /design
// asked for 24px and 20px cards and got 32px, which squeezed short labels
// onto two lines at phone widths (F-631, squeezed-text). Axis padding
// (py-10) still layers on top of the default, as before.
const OWN_PADDING = /(^|\s)p-(\d|\[)/;

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const padding = OWN_PADDING.test(className) ? "" : "p-8 ";
  return (
    <div className={`bg-forge-graphite/50 backdrop-blur-sm border border-white/5 rounded-none ${padding}${className}`}>
      {children}
    </div>
  );
}
