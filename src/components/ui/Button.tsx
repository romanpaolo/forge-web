import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}

type ButtonAsButton = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLink = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants = {
  primary:
    "bg-forge-white text-forge-iron hover:bg-forge-ash active:bg-forge-smoke uppercase tracking-[0.1em] font-[family-name:var(--font-mono)]",
  secondary:
    "border border-forge-graphite text-forge-ash hover:text-forge-white hover:border-forge-smoke uppercase tracking-[0.1em] font-[family-name:var(--font-mono)]",
};

const sizes = {
  sm: "px-6 py-2.5 text-sm",
  md: "px-8 py-4 text-lg",
  lg: "px-10 py-5 text-xl",
};

export default function Button({ variant = "primary", size = "md", ...props }: ButtonProps) {
  const className = `${variants[variant]} ${sizes[size]} rounded-none font-semibold transition-all inline-flex items-center justify-center gap-2 ${(props as { className?: string }).className || ""}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return <a href={href} {...rest} className={className} />;
  }

  return <button {...(props as ButtonAsButton)} className={className} />;
}
