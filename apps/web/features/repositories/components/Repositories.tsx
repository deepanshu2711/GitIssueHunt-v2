"use client";
import { Heading } from "@web/components/Heading";
import RepoCard from "./RepoCard";
import { useGetRepos } from "../hooks/query/useGetRepos";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationLink,
  PaginationPrevious,
} from "@repo/ui/components/shadcn/pagination";
import { useMemo, useState } from "react";
import { PageLoader } from "@web/components/PageLoader";

const Repositories = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetRepos(page);

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

  return (
    <section className="w-full flex flex-col gap-10">
      <Heading
        heading="Explore GitHub Repositories"
        description="Search, filter, and track repositories from across the community"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.items.map((repo, idx) => (
          <RepoCard repo={repo} key={idx} />
        ))}
      </div>
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

export default Repositories;
