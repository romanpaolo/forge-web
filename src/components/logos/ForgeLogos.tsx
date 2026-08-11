interface LogoProps {
  size?: number;
  className?: string;
  color?: string;
}

// ─── Concept A: Classic Hex Nut ──────────────────────────────────────────────
// Clean hexagonal nut - outer hex + inner circle bore hole
export function LogoNutClassic({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ─── Concept B: Hex Nut with Thread Lines ────────────────────────────────────
// Hex nut with internal threading detail - industrial precision
export function LogoNutThreaded({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="12" stroke={color} strokeWidth="1.5" />
      {/* Thread lines inside bore */}
      <circle cx="32" cy="32" r="9" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <circle cx="32" cy="32" r="6" stroke={color} strokeWidth="0.5" opacity="0.2" />
      <circle cx="32" cy="32" r="3" fill={color} opacity="0.4" />
    </svg>
  );
}

// ─── Concept C: Hex Nut Beveled ──────────────────────────────────────────────
// Hex nut with chamfered inner edges - shows depth/3D
export function LogoNutBeveled({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Outer hex */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {/* Inner hex - same orientation, shows depth */}
      <path d="M32 12L48 22V42L32 52L16 42V22L32 12Z" stroke={color} strokeWidth="0.75" opacity="0.3" strokeLinejoin="round" />
      {/* Bore hole */}
      <circle cx="32" cy="32" r="10" stroke={color} strokeWidth="1.5" />
      {/* Chamfer lines connecting outer to inner hex */}
      <line x1="32" y1="4" x2="32" y2="12" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <line x1="56" y1="18" x2="48" y2="22" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <line x1="56" y1="46" x2="48" y2="42" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <line x1="32" y1="60" x2="32" y2="52" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <line x1="8" y1="46" x2="16" y2="42" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <line x1="8" y1="18" x2="16" y2="22" stroke={color} strokeWidth="0.5" opacity="0.25" />
    </svg>
  );
}

// ─── Concept D: Hex Nut with Crosshair ───────────────────────────────────────
// Hex nut + precision crosshair - construction meets field intelligence
export function LogoNutCrosshair({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="12" stroke={color} strokeWidth="1.5" />
      {/* Crosshair extending through bore */}
      <line x1="32" y1="16" x2="32" y2="48" stroke={color} strokeWidth="0.75" opacity="0.5" />
      <line x1="16" y1="32" x2="48" y2="32" stroke={color} strokeWidth="0.75" opacity="0.5" />
      {/* Center precision dot */}
      <circle cx="32" cy="32" r="2" fill={color} />
    </svg>
  );
}

// ─── Concept E: Double Hex Nut ───────────────────────────────────────────────
// Two nested hex nuts rotated - resembles a lock washer or precision coupling
export function LogoNutDouble({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Outer hex */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {/* Inner hex rotated 30deg */}
      <g transform="rotate(30 32 32)">
        <path d="M32 14L46 22V42L32 50L18 42V22L32 14Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />
      </g>
      {/* Bore hole */}
      <circle cx="32" cy="32" r="7" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ─── Concept F: Hex Nut Split ────────────────────────────────────────────────
// Hex nut with a split/gap - suggests transformation, raw → refined
export function LogoNutSplit({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Top half of hex */}
      <path d="M32 4L56 18V30H8V18L32 4Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {/* Bottom half of hex - offset down by 4px for split gap */}
      <path d="M8 34V46L32 60L56 46V34H8Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {/* Bore hole top arc */}
      <path d="M44 32A12 12 0 0 0 20 32" stroke={color} strokeWidth="1.5" />
      {/* Bore hole bottom arc */}
      <path d="M20 32A12 12 0 0 0 44 32" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ─── Concept G: Hex Nut Minimal ──────────────────────────────────────────────
// Ultra-minimal hex nut - single weight, clean negative space
export function LogoNutMinimal({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 6L54 19V45L32 58L10 45V19L32 6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="14" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ─── Concept H: Hex Nut Heavy ────────────────────────────────────────────────
// Bold, thick hex nut - strong industrial presence
export function LogoNutHeavy({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke={color} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="11" stroke={color} strokeWidth="3" />
    </svg>
  );
}

// ─── Concept I: Hex Socket ───────────────────────────────────────────────────
// Hex socket (Allen key hole) inside a circle - tool + precision
export function LogoHexSocket({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Outer circle - bolt head */}
      <circle cx="32" cy="32" r="28" stroke={color} strokeWidth="1.5" />
      {/* Inner hex socket */}
      <path d="M32 16L46 24V40L32 48L18 40V24L32 16Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Concept J: Hex Nut with Data Lines ──────────────────────────────────────
// Hex nut + horizontal scan lines - hardware meets structured data
export function LogoNutData({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="12" stroke={color} strokeWidth="1.5" />
      {/* Data scan lines - horizontal, clipped to hex */}
      <line x1="10" y1="24" x2="54" y2="24" stroke={color} strokeWidth="0.5" opacity="0.2" />
      <line x1="8" y1="32" x2="56" y2="32" stroke={color} strokeWidth="0.5" opacity="0.2" />
      <line x1="10" y1="40" x2="54" y2="40" stroke={color} strokeWidth="0.5" opacity="0.2" />
      {/* Center dot */}
      <circle cx="32" cy="32" r="2" fill={color} />
    </svg>
  );
}

// ─── Concept K: Hex Wrench ───────────────────────────────────────────────────
// Hex nut with wrench flats highlighted - the tool that builds
export function LogoNutWrench({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Outer hex */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {/* Wrench flat indicators - left and right */}
      <line x1="8" y1="18" x2="8" y2="46" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="56" y1="18" x2="56" y2="46" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Bore */}
      <circle cx="32" cy="32" r="10" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ─── Concept L: Hex Nut Perspective ──────────────────────────────────────────
// Hex nut shown at slight 3D angle - depth and dimension
export function LogoNutPerspective({ size = 48, className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Top face of nut */}
      <path d="M32 6L52 16L52 20L32 10L12 20L12 16L32 6Z" fill={color} opacity="0.1" />
      <path d="M32 6L52 16L32 26L12 16L32 6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Side faces */}
      <path d="M12 16V40L32 50V26L12 16Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M52 16V40L32 50V26L52 16Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Bore hole - ellipse on top face */}
      <ellipse cx="32" cy="16" rx="8" ry="4" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
