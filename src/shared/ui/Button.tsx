import type { ButtonHTMLAttributes } from "react";
import { buttonVariants } from "./buttonVariants";
import { cn } from "../lib/cn";
import type { VariantProps } from "class-variance-authority";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = ({ variant, className, children, ...rest }: Props) => {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
