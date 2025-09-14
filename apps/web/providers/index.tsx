import { TanstackQueryProvider } from "./QueryClientProvider";
import { AuthSessionProvider } from "./SessionProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthSessionProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </AuthSessionProvider>
  );
};
