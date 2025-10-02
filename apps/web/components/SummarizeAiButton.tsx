import { Button } from "@repo/ui/components/shadcn/button";
import { Loader2 } from "lucide-react";
import React from "react";

interface AIButtonProps {
  onClick: () => void;
  isLoading: boolean;
  children: React.ReactNode;
}

export function AIButton({ onClick, isLoading, children }: AIButtonProps) {
  return (
    <Button
      className="w-full justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 
                 text-white hover:from-purple-600 hover:to-blue-600 
                 transition-all duration-300 shadow-md hover:shadow-lg"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
      {isLoading ? "Summarizing..." : "Summarize with AI"}
    </Button>
  );
}
