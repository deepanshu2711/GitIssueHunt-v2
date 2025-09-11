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
} from "lucide-react";
import { IssueBody } from "./IssueBody";
import Link from "next/link";
import { Heading } from "@web/components/Heading";
import { div } from "framer-motion/client";

const IssueDetails = ({ data }) => {
  console.log(data);
  return (
    <div className="flex flex-col gap-10">
      <Heading
        heading="GitHub Issue Details"
        description="View complete details of the selected GitHub issue, including author, labels, comments, and repository links."
      />

      <div className="grid grid-cols-4 gap-5">
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.labels.map((label) => (
                <Badge
                  key={label.name}
                  className={` text-black`}
                  style={{ backgroundColor: `#${label.color}` }}
                >
                  {label.name}
                </Badge>
              ))}
            </div>
            <CardTitle className="text-2xl text-balance leading-tight">
              {data.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-4 text-muted-foreground">
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
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                <IssueBody body={data.body} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="max-h-52">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full cursor-pointer ">
              <Link href={data.html_url} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on GitHub
              </Link>
            </Button>
            <Button asChild>
              <Link
                href={`https://github.com/${data.repository_url
                  .split("/")
                  .slice(-2)
                  .join("/")}`}
                className="w-full"
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
