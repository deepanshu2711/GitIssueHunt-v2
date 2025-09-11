import { Badge } from "@repo/ui/components/shadcn/badge";
import { Button } from "@repo/ui/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn/card";
import {
  Calendar,
  ExternalLink,
  GitFork,
  MessageSquare,
  User,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { IssueBody } from "./IssueBody";
import Link from "next/link";
import { Heading } from "@web/components/Heading";
import { getRepoName } from "@web/utils/helpers";
import { GitHubIssue } from "../types";

interface IssuDetailsProps {
  data: GitHubIssue;
}

const IssueDetails = ({ data }: IssuDetailsProps) => {
  return (
    <div className="flex flex-col gap-10">
      <Heading
        heading="GitHub Issue Details"
        description="View the complete details of this GitHub issue, including author, labels, comments, and repository links."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="col-span-3">
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {data.labels.map((label) => (
                <Badge
                  key={label.name}
                  className="text-xs font-medium"
                  style={{ backgroundColor: `#${label.color}`, color: "#000" }}
                >
                  {label.name}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold leading-tight text-balance">
                {data.title}
              </CardTitle>
              {data.state === "open" ? (
                <span className="flex items-center gap-1 text-green-500 text-sm">
                  <CheckCircle2 className="h-4 w-4" /> Open
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-500 text-sm">
                  <XCircle className="h-4 w-4" /> Closed
                </span>
              )}
            </div>

            <CardDescription className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {data.user.login}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(data.created_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {data.comments} comments
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="prose prose-invert max-w-none">
              <IssueBody body={data.body!} />
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link href={data.html_url} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on GitHub
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full">
              <Link
                href={`https://github.com/${getRepoName(data.repository_url)}`}
                target="_blank"
              >
                <GitFork className="h-4 w-4 mr-2" />
                View Repository
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IssueDetails;
