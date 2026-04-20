"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ShimmerImageProps = ImageProps & {
  wrapperClassName?: string;
};

export function ShimmerImage({
  wrapperClassName,
  className,
  onLoad,
  alt,
  ...props
}: ShimmerImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {!isLoaded ? (
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--stone)_25%,var(--paper-strong)_50%,var(--stone)_75%)] bg-[length:200%_100%] [animation:shimmer_1.5s_infinite]" />
      ) : null}

      <Image
        alt={alt}
        className={cn("transition duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
        onLoad={(event) => {
          setIsLoaded(true);
          onLoad?.(event);
        }}
        {...props}
      />
    </div>
  );
}
