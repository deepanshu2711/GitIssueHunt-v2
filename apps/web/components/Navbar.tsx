"use client";
import { Button } from "@repo/ui/components/shadcn/button";
import { Github, Search } from "lucide-react";
import { signIn } from "next-auth/react";

export const Navbar = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">GitIssueHunt</span>
        </div>
        <Button
          onClick={() => signIn("github")}
          variant="secondary"
          className="gap-2  cursor-pointer"
        >
          <Github className="w-4 h-4" />
          Sign in with GitHub
        </Button>
      </div>
    </nav>
  );
};
