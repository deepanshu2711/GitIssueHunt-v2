"use client";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@repo/ui/components/shadcn/card";
import { Badge } from "@repo/ui/components/shadcn/badge";
import { Issue, Label } from "../types";

interface IssueCardProps {
  item: Issue;
}

export const IssueCard = ({ item }: IssueCardProps) => {
  return (
    <Card className="border-[1px] relative  text-gray-800  transition-all">
      <CardContent className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Image
            src={item.user.avatar_url}
            height={26}
            width={25}
            className="rounded-full"
            alt="user avatar"
          />
          <Link
            href={`https://github.com/${item.repository_url
              .split("/")
              .slice(-2)
              .join("/")}`}
            target="_blank"
            className="hover:text-blue-500 cursor-pointer"
          >
            {item.repository_url.split("/").slice(-2).join("/")}
          </Link>
        </div>
        <Link
          href={item.html_url}
          target="_blank"
          className="hover:text-blue-500 line-clamp-1 font-semibold cursor-pointer"
        >
          {item.title}
        </Link>
        <p className="line-clamp-1 text-sm">{item.body}</p>
        <div className="flex overflow-hidden items-center gap-1 mt-2">
          {item.labels.map((label: Label, idx: number) => (
            <Badge key={idx} style={{ backgroundColor: `#${label.color}` }}>
              {label.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
