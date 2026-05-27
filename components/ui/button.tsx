import React from "react";
import { Link } from "react-router";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  href?: string;
  target?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      children,
      href,
      target,
      ...props
    },
    ref,
  ) => {
    const classNames = [
      "btn",
      `btn--${variant}`,
      `btn--${size}`,
      fullWidth ? "btn--full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (href) {
      return (
        <a href={href} target={target ?? "_self"}>
          <button ref={ref} className={classNames} {...props}>
            {children}
          </button>
        </a>
      );
    }
    return (
      <button ref={ref} className={classNames} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
