import { TanstackQueryProvider } from "./QueryClientProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
};
