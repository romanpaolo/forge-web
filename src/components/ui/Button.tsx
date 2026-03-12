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
    "bg-forge-orange text-white hover:bg-forge-amber active:bg-forge-ember shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]",
  secondary:
    "border border-forge-ash/20 text-forge-white hover:bg-forge-graphite",
};

const sizes = {
  sm: "px-6 py-2.5 text-sm",
  md: "px-8 py-4 text-lg",
  lg: "px-10 py-5 text-xl",
};

export default function Button({ variant = "primary", size = "md", ...props }: ButtonProps) {
  const className = `${variants[variant]} ${sizes[size]} rounded-full font-semibold transition-all inline-flex items-center justify-center gap-2 ${(props as { className?: string }).className || ""}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return <a href={href} {...rest} className={className} />;
  }

  return <button {...(props as ButtonAsButton)} className={className} />;
}
