"use client";
import * as React from "react";
import { Separator, SeparatorProps } from "react-aria-components";

import { cn } from "@/lib/utils";

const _Separator = ({ orientation, className, ...props }: SeparatorProps) => {
  return (
    <Separator
      className={cn(
        "shrink-0 bg-border",
        orientation === "vertical"
          ? "min-h-full w-[1px]"
          : "min-w-full h-[1px]",
        className,
      )}
      orientation={orientation}
      {...props}
    />
  );
};

export { _Separator as Separator };
