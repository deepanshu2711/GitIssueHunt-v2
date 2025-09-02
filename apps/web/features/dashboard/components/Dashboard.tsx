import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/shadcn/card";
import { Heading } from "@web/components/Heading";

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      <Heading
        heading="Hi Deepanshu, here's what's happening with your tracked repos."
        description={
          "Stay on top of saved issues, activity and recommendations."
        }
      />
      <div className="grid font-serif grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Tracked Repos</CardTitle>
            <CardDescription>Total repositories you follow.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saved Issues</CardTitle>
            <CardDescription>Pinned for later</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Starred Issues</CardTitle>
            <CardDescription>Issues you starred.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">3</p>
          </CardContent>
        </Card>
        <Card className="opacity-60 pointer-events-none">
          <CardHeader>
            <CardTitle>🚀 Upcoming</CardTitle>
            <CardDescription>This feature is coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">—</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
