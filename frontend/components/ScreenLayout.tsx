import { cn } from "@/lib/utils";
import React from "react";

const ScreenLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("min-h-screen min-w-screen bg-bg-hero text-text-pri", className)}>
      {children}
    </div>
  );
};

export default ScreenLayout;
