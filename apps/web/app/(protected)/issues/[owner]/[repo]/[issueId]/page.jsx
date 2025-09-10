import { IssueDetails, IssueService } from "@web/features/issues";

export default async function Page({ params }) {
  const { owner, repo, issueId } = await params;
  const issueData = await IssueService.getIssueDetails(owner, repo, issueId);

  return (
    <>
      <IssueDetails data={issueData.data} />
    </>
  );
}
