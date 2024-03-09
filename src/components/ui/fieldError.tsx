import * as React from "react";
import { FieldError } from "react-aria-components";

import { cn } from "@/lib/utils";

export interface FieldErrorProps
  extends React.HTMLAttributes<HTMLSpanElement> { }

const _FieldError = ({ className, ...props }: FieldErrorProps) => {
  return <FieldError className={cn("text-invalid", className)} {...props} />;
};

export { _FieldError as FieldError };
