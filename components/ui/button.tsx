import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const classNames = [
      "cursor-pointer",
      "btn",
      `btn--${variant}`,
      `btn--${size}`,
      fullWidth && "btn--full-width",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classNames} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
