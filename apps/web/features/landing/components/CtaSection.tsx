"use client";
import { Button } from "@repo/ui/components/shadcn/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export const CtaSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Contributing?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of developers who are making their mark on open source
          projects worldwide.
        </p>
        <Button
          size="lg"
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
          onClick={() => signIn("github")}
        >
          <Github className="w-5 h-5" />
          Get Started with GitHub
        </Button>
      </div>
    </section>
  );
};
