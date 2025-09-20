import { Issue } from "@web/features/issues";

export const getIssueLink = (item: Issue) => {
  const repoPath = item.repository_url.split("/").slice(-2).join("/"); // owner/repo
  return `issues/${repoPath}/${item.number}`;
};

export const getRepoName = (repoUrl: string): string => {
  if (!repoUrl) return "";
  return repoUrl.split("/").slice(-2).join("/");
};

export const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-500",
    Python: "bg-green-500",
    Vue: "bg-emerald-500",
    Rust: "bg-orange-500",
    Go: "bg-cyan-500",
  };
  return colors[language] || "bg-gray-500";
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
