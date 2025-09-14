import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export const IssueBody = ({ body }: { body: string }) => {
  return (
    <div className="prose prose-invert max-w-none whitespace-pre-wrap">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {body}
      </ReactMarkdown>
    </div>
  );
};
