import { TanstackQueryProvider } from "./QueryClientProvider";
import { AuthSessionProvider } from "./SessionProvider";
import { ToasterProvider } from "./ToasterProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthSessionProvider>
      <TanstackQueryProvider>
        <ToasterProvider>{children}</ToasterProvider>
      </TanstackQueryProvider>
    </AuthSessionProvider>
  );
};
