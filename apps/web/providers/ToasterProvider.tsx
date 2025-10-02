"use client";

import { Toaster } from "sonner";

export const ToasterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
