"use client";
import { Badge } from "@repo/ui/components/shadcn/badge";
import { Button } from "@repo/ui/components/shadcn/button";
import { Card, CardContent } from "@repo/ui/components/shadcn/card";
import {
  Github,
  Search,
  Trophy,
  Users,
  Star,
  GitBranch,
  Code,
  Heart,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
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
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge
            variant="secondary"
            className="mb-6 bg-primary/10 text-primary border-primary/20"
          >
            🚀 Perfect for Open Source Contributors
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Discover Your Next
            <span className="text-primary"> Open Source</span>
            <br />
            Contribution
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            GitIssueHunt helps you find beginner-friendly GitHub issues filtered
            by programming language. Start contributing to open source projects
            today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
              onClick={() => signIn("github")}
            >
              <Search className="w-5 h-5" />
              Start Hunting Issues
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-[0.5px] !border-gray-500 bg-transparent cursor-pointer"
            >
              <Github className="w-5 h-5" />
              <Link
                href={"https://github.com/deepanshu2711/GitIssueHunt-v2"}
                target="_blank"
              >
                View on GitHub
              </Link>
            </Button>
          </div>

          {/* App Preview */}
          <div className="relative w-full mx-auto">
            {/* <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div> */}
            <Image
              src={"/new_landing.jpeg"}
              alt="GitIssueHunt App Interface"
              width={1000}
              height={500}
              className="relative rounded-xl border border-border shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Contribute
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make open source contribution
              accessible and rewarding
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Smart Issue Discovery
                </h3>
                <p className="text-muted-foreground">
                  Find beginner-friendly issues filtered by programming
                  language, difficulty level, and project type.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  Monitor your contributions, track completed issues, and see
                  your impact on the open source community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:bg-card/80 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
                <p className="text-muted-foreground">
                  Build your reputation, earn badges, and showcase your
                  contributions to potential employers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Issues Discovered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2.5K+</div>
              <div className="text-muted-foreground">Active Contributors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Open Source Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Programming Languages</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow developers and maintainers who are passionate
              about open source
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">For Contributors</h3>
                    <p className="text-sm text-muted-foreground">
                      New to open source
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "GitIssueHunt made my first open source contribution so much
                  easier. The filtering by language and difficulty helped me
                  find the perfect starting point!"
                </p>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary fill-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Code className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">For Maintainers</h3>
                    <p className="text-sm text-muted-foreground">
                      Project owner
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "We've seen a 300% increase in quality contributions since
                  listing our 'good first issue' tags on GitIssueHunt. Amazing
                  platform!"
                </p>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <Star className="w-4 h-4 text-primary fill-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Contributing?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are making their mark on open
            source projects worldwide.
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

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">GitIssueHunt</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Made for developers, by developers. Discover, contribute, and
                grow in the open source community.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 GitIssueHunt. Made with{" "}
              <Heart className="w-4 h-4 inline text-accent" /> for the open
              source community.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
