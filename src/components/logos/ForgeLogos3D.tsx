interface LogoProps {
  size?: number;
  className?: string;
}

// ─── 3D Concept A: Metallic Hex Nut ─────────────────────────────────────────
// Top-down hex nut with gradient shading for 3D depth
export function Logo3DNutMetallic({ size = 48, className = "" }: LogoProps) {
  const id = "met";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      {/* Outer hex - gradient filled */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" fill={`url(#${id}-a)`} />
      {/* Inner hex for bevel depth */}
      <path d="M32 10L50 21V43L32 54L14 43V21L32 10Z" fill={`url(#${id}-b)`} />
      {/* Outer hex stroke */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke="#CBD5E1" strokeWidth="0.75" strokeLinejoin="round" />
      {/* Bore hole */}
      <circle cx="32" cy="32" r="10" fill="#0A0A0F" />
      <circle cx="32" cy="32" r="10" stroke="#94A3B8" strokeWidth="0.75" />
      {/* Inner bore ring */}
      <circle cx="32" cy="32" r="7" stroke="#475569" strokeWidth="0.5" />
    </svg>
  );
}

// ─── 3D Concept B: Beveled Hex ───────────────────────────────────────────────
// Hex with per-face shading - each of the 6 faces has different tone
export function Logo3DNutIsometric({ size = 48, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* 6 individual hex faces with different shading */}
      <path d="M32 4L56 18L32 32L32 4Z" fill="#475569" /> {/* top-right */}
      <path d="M56 18L56 46L32 32L56 18Z" fill="#334155" /> {/* right */}
      <path d="M56 46L32 60L32 32L56 46Z" fill="#1E293B" /> {/* bottom-right */}
      <path d="M32 60L8 46L32 32L32 60Z" fill="#283548" /> {/* bottom-left */}
      <path d="M8 46L8 18L32 32L8 46Z" fill="#3B4D63" /> {/* left */}
      <path d="M8 18L32 4L32 32L8 18Z" fill="#536379" /> {/* top-left */}
      {/* Outer hex stroke */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke="#64748B" strokeWidth="1" strokeLinejoin="round" />
      {/* Inner spoke lines for faceted look */}
      <line x1="32" y1="4" x2="32" y2="32" stroke="#64748B" strokeWidth="0.5" opacity="0.5" />
      <line x1="56" y1="18" x2="32" y2="32" stroke="#64748B" strokeWidth="0.5" opacity="0.5" />
      <line x1="56" y1="46" x2="32" y2="32" stroke="#64748B" strokeWidth="0.5" opacity="0.3" />
      <line x1="32" y1="60" x2="32" y2="32" stroke="#64748B" strokeWidth="0.5" opacity="0.3" />
      <line x1="8" y1="46" x2="32" y2="32" stroke="#64748B" strokeWidth="0.5" opacity="0.4" />
      <line x1="8" y1="18" x2="32" y2="32" stroke="#64748B" strokeWidth="0.5" opacity="0.5" />
      {/* Bore */}
      <circle cx="32" cy="32" r="10" fill="#0A0A0F" stroke="#94A3B8" strokeWidth="0.75" />
    </svg>
  );
}

// ─── 3D Concept C: Cyan Glow Hex ────────────────────────────────────────────
// Dark hex nut with glowing cyan edges - sci-fi/holographic
export function Logo3DNutGlow({ size = 48, className = "" }: LogoProps) {
  const id = "glo";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <defs>
        <filter id={`${id}-bl`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      {/* Glow layer behind */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke="#0EA5E9" strokeWidth="3" strokeLinejoin="round" opacity="0.25" filter={`url(#${id}-bl)`} />
      <circle cx="32" cy="32" r="10" stroke="#0EA5E9" strokeWidth="2" opacity="0.2" filter={`url(#${id}-bl)`} />
      {/* Solid hex fill */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" fill="#0A0A0F" />
      {/* Hex edges glowing */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke="#0EA5E9" strokeWidth="1.25" strokeLinejoin="round" />
      {/* Inner bevel hex */}
      <path d="M32 12L48 22V42L32 52L16 42V22L32 12Z" stroke="#0EA5E9" strokeWidth="0.5" strokeLinejoin="round" opacity="0.3" />
      {/* Bore */}
      <circle cx="32" cy="32" r="10" fill="#050507" stroke="#0EA5E9" strokeWidth="0.75" />
      {/* Center dot */}
      <circle cx="32" cy="32" r="2" fill="#0EA5E9" opacity="0.8" />
    </svg>
  );
}

// ─── 3D Concept D: Wireframe Hex ────────────────────────────────────────────
// All construction lines visible - technical/blueprint style
export function Logo3DNutWireframe({ size = 48, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Outer hex */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke="#94A3B8" strokeWidth="1" strokeLinejoin="round" />
      {/* Inner bevel hex */}
      <path d="M32 12L48 22V42L32 52L16 42V22L32 12Z" stroke="#94A3B8" strokeWidth="0.5" strokeLinejoin="round" opacity="0.35" />
      {/* Bevel connection lines */}
      <line x1="32" y1="4" x2="32" y2="12" stroke="#94A3B8" strokeWidth="0.5" opacity="0.3" />
      <line x1="56" y1="18" x2="48" y2="22" stroke="#94A3B8" strokeWidth="0.5" opacity="0.3" />
      <line x1="56" y1="46" x2="48" y2="42" stroke="#94A3B8" strokeWidth="0.5" opacity="0.3" />
      <line x1="32" y1="60" x2="32" y2="52" stroke="#94A3B8" strokeWidth="0.5" opacity="0.3" />
      <line x1="8" y1="46" x2="16" y2="42" stroke="#94A3B8" strokeWidth="0.5" opacity="0.3" />
      <line x1="8" y1="18" x2="16" y2="22" stroke="#94A3B8" strokeWidth="0.5" opacity="0.3" />
      {/* Bore with thread rings */}
      <circle cx="32" cy="32" r="10" stroke="#94A3B8" strokeWidth="0.75" />
      <circle cx="32" cy="32" r="7" stroke="#94A3B8" strokeWidth="0.5" opacity="0.25" strokeDasharray="2 2" />
      <circle cx="32" cy="32" r="4" stroke="#94A3B8" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

// ─── 3D Concept E: Chrome Hex ───────────────────────────────────────────────
// Multi-stop gradient for high-polish chrome reflections on hex shape
export function Logo3DNutChrome({ size = 48, className = "" }: LogoProps) {
  const id = "chr";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="25%" stopColor="#94A3B8" />
          <stop offset="45%" stopColor="#F1F5F9" />
          <stop offset="65%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>
      {/* Chrome hex body */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" fill={`url(#${id}-a)`} />
      {/* Inner bevel */}
      <path d="M32 10L50 21V43L32 54L14 43V21L32 10Z" fill={`url(#${id}-b)`} opacity="0.5" />
      {/* Edge highlight */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke="#E2E8F0" strokeWidth="0.5" strokeLinejoin="round" />
      {/* Highlight streak across top face */}
      <path d="M20 14L44 14" stroke="white" strokeWidth="0.75" opacity="0.3" strokeLinecap="round" />
      {/* Bore */}
      <circle cx="32" cy="32" r="10" fill="#1E293B" stroke="#CBD5E1" strokeWidth="0.75" />
      <circle cx="32" cy="32" r="7" stroke="#475569" strokeWidth="0.5" />
    </svg>
  );
}

// ─── 3D Concept F: Floating Hex ─────────────────────────────────────────────
// Hex nut hovering with shadow below - elevated premium feel
export function Logo3DNutFloating({ size = 48, className = "" }: LogoProps) {
  const id = "flt";
  return (
    <svg width={size} height={size} viewBox="0 0 64 68" fill="none" className={className}>
      <defs>
        <radialGradient id={`${id}-sh`}>
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="32" cy="62" rx="20" ry="4" fill={`url(#${id}-sh)`} />
      {/* Hex nut - lifted */}
      <path d="M32 2L54 15V41L32 54L10 41V15L32 2Z" fill="#111827" stroke="#475569" strokeWidth="1" strokeLinejoin="round" />
      {/* Inner bevel */}
      <path d="M32 9L48 19V39L32 49L16 39V19L32 9Z" stroke="#334155" strokeWidth="0.5" strokeLinejoin="round" opacity="0.4" />
      {/* Bore */}
      <circle cx="32" cy="28" r="9" fill="#050507" stroke="#64748B" strokeWidth="0.75" />
      {/* Top edge highlight */}
      <path d="M32 2L54 15" stroke="#94A3B8" strokeWidth="0.5" opacity="0.6" />
      <path d="M32 2L10 15" stroke="#94A3B8" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

// ─── 3D Concept G: Embossed Hex ─────────────────────────────────────────────
// Flat hex with pressed-in depth - stamped/machined relief
export function Logo3DNutEmbossed({ size = 48, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Outer hex - surface */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" fill="#1E293B" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Pressed-in hex - shadow edge top-right */}
      <path d="M32 13L47 22V42L32 51L17 42V22L32 13Z" fill="#111827" />
      <path d="M32 13L47 22" stroke="#0F172A" strokeWidth="1" /> {/* dark edge */}
      <path d="M47 22V42" stroke="#0F172A" strokeWidth="1" />
      <path d="M17 42L32 51L47 42" stroke="#334155" strokeWidth="0.75" /> {/* light edge */}
      <path d="M17 22L17 42" stroke="#334155" strokeWidth="0.75" />
      <path d="M32 13L17 22" stroke="#334155" strokeWidth="0.75" />
      {/* Bore */}
      <circle cx="32" cy="32" r="8" fill="#050507" stroke="#475569" strokeWidth="1" />
      {/* Inner thread hint */}
      <circle cx="32" cy="32" r="5.5" stroke="#1E293B" strokeWidth="0.5" />
    </svg>
  );
}

// ─── 3D Concept H: Hologram Hex ─────────────────────────────────────────────
// Holographic scan-line effect over hex shape
export function Logo3DNutHologram({ size = 48, className = "" }: LogoProps) {
  const id = "hol";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.05" />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" />
        </clipPath>
      </defs>
      {/* Hex fill with gradient */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" fill={`url(#${id}-g)`} />
      {/* Scan lines clipped to hex */}
      <g clipPath={`url(#${id}-clip)`}>
        {[12, 18, 24, 30, 36, 42, 48, 54].map((y) => (
          <line key={y} x1="4" y1={y} x2="60" y2={y} stroke="#0EA5E9" strokeWidth="0.3" opacity={0.4 - (y - 12) * 0.04} />
        ))}
      </g>
      {/* Hex outline */}
      <path d="M32 4L56 18V46L32 60L8 46V18L32 4Z" stroke="#0EA5E9" strokeWidth="1" strokeLinejoin="round" />
      {/* Inner bevel hint */}
      <path d="M32 12L48 22V42L32 52L16 42V22L32 12Z" stroke="#0EA5E9" strokeWidth="0.5" strokeLinejoin="round" opacity="0.25" />
      {/* Bore */}
      <circle cx="32" cy="32" r="10" stroke="#0EA5E9" strokeWidth="0.75" />
      <circle cx="32" cy="32" r="1.5" fill="#0EA5E9" />
    </svg>
  );
}

// ─── 3D Concept I: Stacked Hex Nuts ─────────────────────────────────────────
// Two hex nuts stacked with offset - layered depth
export function Logo3DNutStacked({ size = 48, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Back hex - offset down-right */}
      <path d="M36 8L58 21V47L36 60L14 47V21L36 8Z" fill="#111827" stroke="#334155" strokeWidth="0.75" strokeLinejoin="round" />
      <circle cx="36" cy="34" r="9" fill="#050507" stroke="#334155" strokeWidth="0.5" />
      {/* Front hex - main */}
      <path d="M28 4L50 17V43L28 56L6 43V17L28 4Z" fill="#1E293B" stroke="#64748B" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="28" cy="30" r="9" fill="#0A0A0F" stroke="#64748B" strokeWidth="0.75" />
      <circle cx="28" cy="30" r="5.5" stroke="#334155" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

// ─── 3D Concept J: Exploded Hex ─────────────────────────────────────────────
// Hex nut with concentric layers separated - deconstructed view
export function Logo3DNutExploded({ size = 48, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Outer ring - expanded out */}
      <path d="M32 2L58 17V47L32 62L6 47V17L32 2Z" stroke="#475569" strokeWidth="0.75" strokeLinejoin="round" opacity="0.5" />
      {/* Main hex body */}
      <path d="M32 8L52 20V44L32 56L12 44V20L32 8Z" fill="#1E293B" stroke="#64748B" strokeWidth="1" strokeLinejoin="round" />
      {/* Inner bevel */}
      <path d="M32 14L46 23V41L32 50L18 41V23L32 14Z" stroke="#475569" strokeWidth="0.5" strokeLinejoin="round" opacity="0.4" />
      {/* Bore - expanded ring */}
      <circle cx="32" cy="32" r="13" stroke="#475569" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
      {/* Bore */}
      <circle cx="32" cy="32" r="9" fill="#050507" stroke="#64748B" strokeWidth="0.75" />
      {/* Connection lines */}
      <line x1="32" y1="2" x2="32" y2="8" stroke="#475569" strokeWidth="0.5" opacity="0.3" />
      <line x1="58" y1="17" x2="52" y2="20" stroke="#475569" strokeWidth="0.5" opacity="0.3" />
      <line x1="6" y1="17" x2="12" y2="20" stroke="#475569" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

// ─── 3D Concept K: Orbital Hex ──────────────────────────────────────────────
// Hex nut with orbital ring - field intelligence + precision
export function Logo3DNutOrbital({ size = 48, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Orbital ring - behind */}
      <ellipse cx="32" cy="32" rx="29" ry="10" stroke="#0EA5E9" strokeWidth="0.5" opacity="0.3" transform="rotate(-25 32 32)" />
      {/* Hex nut */}
      <path d="M32 8L52 20V44L32 56L12 44V20L32 8Z" fill="#111827" stroke="#475569" strokeWidth="1" strokeLinejoin="round" />
      {/* Bore */}
      <circle cx="32" cy="32" r="9" fill="#050507" stroke="#64748B" strokeWidth="0.75" />
      <circle cx="32" cy="32" r="5.5" stroke="#334155" strokeWidth="0.5" opacity="0.3" />
      {/* Orbital ring - front arc (passes in front) */}
      <ellipse cx="32" cy="32" rx="29" ry="10" stroke="#0EA5E9" strokeWidth="0.75" opacity="0.5" transform="rotate(-25 32 32)" strokeDasharray="40 52" strokeDashoffset="-10" />
      {/* Orbital dot */}
      <circle cx="8" cy="40" r="2" fill="#0EA5E9" opacity="0.7" />
    </svg>
  );
}

// ─── 3D Concept L: Targeting Hex ────────────────────────────────────────────
// Hex nut with crosshair scope overlay - precision field targeting
export function Logo3DNutTargeting({ size = 48, className = "" }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {/* Hex nut */}
      <path d="M32 6L54 19V45L32 58L10 45V19L32 6Z" fill="#111827" stroke="#64748B" strokeWidth="1" strokeLinejoin="round" />
      {/* Inner bevel */}
      <path d="M32 13L47 22V42L32 51L17 42V22L32 13Z" stroke="#334155" strokeWidth="0.5" strokeLinejoin="round" opacity="0.3" />
      {/* Bore */}
      <circle cx="32" cy="32" r="9" fill="#050507" stroke="#64748B" strokeWidth="0.75" />
      {/* Crosshair */}
      <line x1="32" y1="2" x2="32" y2="20" stroke="#94A3B8" strokeWidth="0.5" opacity="0.6" />
      <line x1="32" y1="44" x2="32" y2="62" stroke="#94A3B8" strokeWidth="0.5" opacity="0.6" />
      <line x1="2" y1="32" x2="20" y2="32" stroke="#94A3B8" strokeWidth="0.5" opacity="0.6" />
      <line x1="44" y1="32" x2="62" y2="32" stroke="#94A3B8" strokeWidth="0.5" opacity="0.6" />
      {/* Corner brackets */}
      <path d="M6 10L6 6L10 6" stroke="#94A3B8" strokeWidth="0.75" strokeLinecap="round" opacity="0.4" />
      <path d="M54 6L58 6L58 10" stroke="#94A3B8" strokeWidth="0.75" strokeLinecap="round" opacity="0.4" />
      <path d="M6 54L6 58L10 58" stroke="#94A3B8" strokeWidth="0.75" strokeLinecap="round" opacity="0.4" />
      <path d="M54 58L58 58L58 54" stroke="#94A3B8" strokeWidth="0.75" strokeLinecap="round" opacity="0.4" />
      {/* Center dot */}
      <circle cx="32" cy="32" r="2" fill="#F8FAFC" />
    </svg>
  );
}
