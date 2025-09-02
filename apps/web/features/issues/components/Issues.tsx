"use client";
import { Heading } from "@web/components/Heading";
import { useGetIssues } from "../hooks/query/useGetIssue";
import { Issue } from "../types";
import { IssueCard } from "./IssueCard";
import { PageLoader } from "@web/components/PageLoader";

const Issues = () => {
  const { data, isLoading } = useGetIssues();

  if (isLoading) return <PageLoader />;
  return (
    <div className="flex  flex-col gap-10">
      <Heading
        heading={"Explore GitHub Issues"}
        description={
          "Stay updated with the latest issues and activity across repositories."
        }
      />
      <div className="grid grid-col-1 lg:grid-cols-2 gap-5">
        {data?.items.map((item: Issue, idx: number) => (
          <div key={idx}>
            <IssueCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Issues;
