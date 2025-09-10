"use client";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@repo/ui/components/shadcn/card";
import { Badge } from "@repo/ui/components/shadcn/badge";
import { Issue, Label } from "../types";
import { getIssueLink } from "@web/utils/helpers";

interface IssueCardProps {
  item: Issue;
}

export const IssueCard = ({ item }: IssueCardProps) => {
  return (
    <Card className="border-[1px] relative cursor-pointer transition-all">
      <CardContent>
        <Link href={getIssueLink(item)} className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <Image
              src={item.user.avatar_url}
              height={26}
              width={25}
              className="rounded-full"
              alt="user avatar"
            />
            <div className=" cursor-pointer">
              {item.repository_url.split("/").slice(-2).join("/")}
            </div>
          </div>
          <div className=" line-clamp-1 font-semibold cursor-pointer">
            {item.title}
          </div>
          <p className="line-clamp-1 text-sm">{item.body}</p>
          <div className="flex overflow-hidden items-center gap-1 mt-2">
            {item.labels.map((label: Label, idx: number) => (
              <Badge key={idx} style={{ backgroundColor: `#${label.color}` }}>
                {label.name}
              </Badge>
            ))}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
