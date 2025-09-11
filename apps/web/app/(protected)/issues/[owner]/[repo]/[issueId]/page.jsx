import { IssueDetails, IssueService } from "@web/features/issues";

export async function generateMetadata({ params }) {
  const { owner, repo, issueId } = params;
  const issueData = await IssueService.getIssueDetails(owner, repo, issueId);

  const issue = issueData.data;

  const title = `${issue.title} · #${issue.number} · ${owner}/${repo}`;
  const description =
    issue.body?.slice(0, 150) || "Open source issue details on GitIssueHunt.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://git-issue-hunt.deepxdev.com/issues/${owner}/${repo}/${issueId}`,
      siteName: "GitIssueHunt",
      type: "article",
      images: [
        {
          url: issue.repository?.owner?.avatar_url || "/default-og.png",
          width: 1200,
          height: 630,
          alt: `${repo} repository issue preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [issue.repository?.owner?.avatar_url || "/default-og.png"],
    },
  };
}

export default async function Page({ params }) {
  const { owner, repo, issueId } = await params;
  const issueData = await IssueService.getIssueDetails(owner, repo, issueId);

  return (
    <>
      <IssueDetails data={issueData.data} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            headline: issueData.data.title,
            description: issueData.data.body?.slice(0, 150),
            url: `https://git-issue-hunt.deepxdev.com/issues/${owner}/${repo}/${issueId}`,
          }),
        }}
      />
    </>
  );
}
