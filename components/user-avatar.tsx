import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  className?: string;
}

export function UserAvatar({ src, className }: UserAvatarProps) {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      {src?.startsWith("http") ? (
        <AvatarImage src={src} />
      ) : (
        <span className="flex justify-center items-center bg-cyan-700 rounded-full w-full h-full">
          <span>{src?.substring(0, 1)}</span>
        </span>
      )}
    </Avatar>
  );
}
