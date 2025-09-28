import { Badge } from "@repo/ui/components/shadcn/badge";
import { Button } from "@repo/ui/components/shadcn/button";
import { Card, CardContent, CardHeader } from "@repo/ui/components/shadcn/card";
import { formatDate, getLanguageColor } from "@web/utils/helpers";
import { Calendar, GitFork, Star } from "lucide-react";
import { Repo } from "../types";
import Image from "next/image";

interface RepoCardInterface {
  repo: Repo;
}

const RepoCard = ({ repo }: RepoCardInterface) => {
  return (
    <Card
      key={repo.id}
      className="hover:shadow-lg transition-shadow duration-200"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 flex items-center gap-2">
            <Image
              src={repo.owner.avatar_url || "/placeholder.svg"}
              height={26}
              width={25}
              className="rounded-full"
              alt="user avatar"
            />
            <h3 className="font-semibold text-card-foreground hover:text-blue-500 cursor-pointer">
              {repo.name}
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {repo.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {repo.topics.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs">
              {topic}
            </Badge>
          ))}
          {repo.topics.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{repo.topics.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}
              />
              <span>{repo.language}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>{repo.stargazers_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              <span>{repo.forks.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Updated {formatDate(repo.updated_at)}</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Star className="h-3 w-3 mr-1" />
              Star
            </Button>
            <Button size="sm" variant="outline">
              <GitFork className="h-3 w-3 mr-1" />
              Fork
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RepoCard;
