export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto py-6">{children}</div>
    </main>
  );
}
