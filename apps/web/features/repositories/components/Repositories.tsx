import { Heading } from "@web/components/Heading";
import { mockRepositories } from "../constants";
import RepoCard from "./RepoCard";

const Repositories = () => {
  return (
    <section className="w-full flex flex-col gap-10">
      <Heading
        heading="Explore GitHub Repositories"
        description="Search, filter, and track repositories from across the community"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockRepositories.map((repo) => (
          <RepoCard repo={repo} />
        ))}
      </div>
    </section>
  );
};

export default Repositories;
