import { Badge } from "@repo/ui/components/shadcn/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn/card";
import {
  Calendar,
  MessageSquare,
  User,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { IssueBody } from "./IssueBody";
import { Heading } from "@web/components/Heading";
import { GitHubIssue } from "../types";
import { QuickActions } from "./QuickActions";

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

        <QuickActions data={data} />
      </div>
    </div>
  );
};

export default IssueDetails;
