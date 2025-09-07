"use client";
import { Button } from "@repo/ui/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn/card";
import { Bug, Github, Search, Trophy } from "lucide-react";
import { signIn } from "next-auth/react";

const Auth = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Branding */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-emerald-600 p-3 rounded-xl">
              <Bug className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Git Issue Hunt</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Discover, track, and contribute to open source issues
          </p>
        </div>

        {/* Auth Card */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">
              Sign in with your GitHub account to start hunting issues
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              // onClick={handleGitHubSignIn}
              onClick={() => signIn("github", { callbackUrl: "/issues" })}
              className="w-full cursor-pointer bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 h-12 text-base font-medium transition-all duration-200 hover:border-emerald-500"
            >
              <Github className="mr-3 h-5 w-5" />
              Continue with GitHub
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                By signing in, you agree to our terms and privacy policy
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center space-y-2">
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <Search className="h-6 w-6 text-emerald-400 mx-auto" />
            </div>
            <p className="text-sm text-gray-400">Discover Issues</p>
          </div>
          <div className="text-center space-y-2">
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <Bug className="h-6 w-6 text-blue-400 mx-auto" />
            </div>
            <p className="text-sm text-gray-400">Track Progress</p>
          </div>
          <div className="text-center space-y-2">
            <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
              <Trophy className="h-6 w-6 text-yellow-400 mx-auto" />
            </div>
            <p className="text-sm text-gray-400">Earn Rewards</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">
            Made for developers, by developers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
