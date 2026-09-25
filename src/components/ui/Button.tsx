import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}

type ButtonAsButton = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLink = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// Both variants carry a 1px border (transparent on primary) so a primary and a
// secondary button of the same size are the same height side by side (F-631).
const variants = {
  primary:
    "bg-forge-white text-forge-iron border border-transparent hover:bg-forge-ash active:bg-forge-smoke uppercase tracking-[0.1em] font-[family-name:var(--font-mono)]",
  secondary:
    "border border-forge-graphite text-forge-ash hover:text-forge-white hover:border-forge-smoke uppercase tracking-[0.1em] font-[family-name:var(--font-mono)]",
};

// md and lg step down one notch below `sm` (640px). Buttons stack full width
// there, and a 320px phone leaves 272px for the label: "START FREE TRIAL" at
// lg and "TRY A SAMPLE WALK" at md did not fit at the desktop size and wrapped.
// The smaller step fits every label on this site on one line (F-631).
const sizes = {
  sm: "px-6 py-2.5 text-sm",
  md: "px-6 py-3.5 text-base sm:px-8 sm:py-4 sm:text-lg",
  lg: "px-8 py-4 text-lg sm:px-10 sm:py-5 sm:text-xl",
};

// whitespace-nowrap: a button label is one line at every width (F-631). The
// row a button sits in must give it room (stack, wrap the row, or collapse
// into a menu); squeezing the label into two or three lines is never the fix.
export default function Button({ variant = "primary", size = "md", ...props }: ButtonProps) {
  const className = `${variants[variant]} ${sizes[size]} rounded-none font-semibold whitespace-nowrap transition-all inline-flex items-center justify-center gap-2 ${(props as { className?: string }).className || ""}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return <a href={href} {...rest} className={className} />;
  }

  return <button {...(props as ButtonAsButton)} className={className} />;
}
