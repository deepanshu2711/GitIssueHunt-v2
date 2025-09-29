"use client";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@repo/ui/components/shadcn/card";
import { Badge } from "@repo/ui/components/shadcn/badge";
import { Button } from "@repo/ui/components/shadcn/button";
import { Issue, Label } from "../types";
import { getIssueLink } from "@web/utils/helpers";
import { ExternalLink, Github } from "lucide-react";

interface IssueCardProps {
  item: Issue;
}

export const IssueCard = ({ item }: IssueCardProps) => {
  const visibleLabels = item.labels.slice(0, 4);
  const extraCount = item.labels.length - visibleLabels.length;
  return (
    <Card className="border-[1px] relative  transition-all">
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <Image
              src={item.user.avatar_url || "/placeholder.svg"}
              height={26}
              width={25}
              className="rounded-full"
              alt="user avatar"
            />
            <div className=" cursor-pointer">
              {item.repository_url.split("/").slice(-2).join("/")}
            </div>
          </div>
          <Link
            href={getIssueLink(item)}
            className=" line-clamp-1 hover:text-blue-600 font-semibold cursor-pointer"
          >
            {item.title}
          </Link>
          <p className="line-clamp-1 text-sm">{item.body}</p>
          <div className="flex overflow-x-scroll items-center gap-1 mt-2 no-scrollbar">
            {visibleLabels.map((label: Label, idx: number) => (
              <Badge key={idx} style={{ backgroundColor: `#${label.color}` }}>
                {label.name}
              </Badge>
            ))}
            {extraCount > 0 && (
              <Badge className="bg-gray-300 text-black">+{extraCount}</Badge>
            )}
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(item.html_url, "_blank");
            }}
            title="View on GitHub"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
