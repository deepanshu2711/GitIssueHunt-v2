"use client";
import { useGetIssues } from "../hooks/query/useGetIssue";
import { Heading } from "@web/components/Heading";
import { Issue } from "../types";
import { IssueCard } from "./IssueCard";
import { PageLoader } from "@web/components/PageLoader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationLink,
  PaginationPrevious,
} from "@repo/ui/components/shadcn/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/shadcn/select";
import { useMemo, useState } from "react";
import { options } from "../constants";

const Issues = () => {
  const [page, setPage] = useState(1);
  const [lang, setLang] = useState("javascript");
  const [label, setLabel] = useState("good first issue");

  const { data, isLoading } = useGetIssues(page, lang, label);

  const totalPages = useMemo(() => {
    return data?.total_count ? Math.ceil(data.total_count / 30) : 0;
  }, [data]);

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).slice(
      Math.max(0, page - 3),
      page + 5,
    );
  }, [totalPages, page]);

  if (isLoading) return <PageLoader />;
  const issues = data?.items || [];

  return (
    <section className="w-full flex flex-col gap-10">
      <Heading
        heading="Explore GitHub Issues"
        description="Stay updated with the latest issues and activity across repositories."
      />

      <div className="flex items-center justify-end gap-4">
        <Select value={label} onValueChange={(value) => setLabel(value)}>
          <SelectTrigger className="w-[250px]  font-semibold">
            <SelectValue placeholder="Select label" />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={lang} onValueChange={(value) => setLang(value)}>
          <SelectTrigger className="w-[180px] font-semibold">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="go">Go</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {issues.length === 0 ? (
        <p className="text-center text-gray-500">
          No issues found. Try changing filters or refresh.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {issues.map((item: Issue, idx: number) => (
            <div key={idx}>
              <IssueCard item={item} />
            </div>
          ))}
        </div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) setPage((p) => p - 1);
              }}
            />
          </PaginationItem>

          {pageNumbers.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(p);
                }}
                className={`${page === p ? "!bg-lime-600" : ""} rounded-md`}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) setPage((p) => p + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default Issues;
