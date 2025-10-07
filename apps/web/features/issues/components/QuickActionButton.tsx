import { Button } from "@repo/ui/components/shadcn/button";
import Link from "next/link";

interface QuickActionButtonProps {
  link: string;
  label: string;
  Icon: any;
}
export const QuickActionButton = ({
  link,
  label,
  Icon,
}: QuickActionButtonProps) => {
  return (
    <Button asChild className="w-full">
      <Link href={link} target="_blank">
        <Icon className="h-4 w-4 mr-2" />
        {label}
      </Link>
    </Button>
  );
};
