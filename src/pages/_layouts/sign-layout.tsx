import { ReactNode } from "react";

interface LayoutDefaultProps {
  children: ReactNode;
}

export function LayoutSignIn({ children }: LayoutDefaultProps) {
  return (
    <div className="bg-content1 h-screen w-screen">
      <div>{children}</div>
    </div>
  );
}
