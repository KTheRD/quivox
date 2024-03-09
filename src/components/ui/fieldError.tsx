import * as React from "react";
import { FieldError, FieldErrorProps } from "react-aria-components";

import { cn } from "@/lib/utils";


const _FieldError = ({ className, children, ...props }: FieldErrorProps) => {
  return (
    <FieldError className={cn("text-invalid", className)} {...props}>
      {children}
    </FieldError>
  );
};

export { _FieldError as FieldError };
