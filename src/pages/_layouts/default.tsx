import { Header } from "@/components/panel/header";
import { Menu } from "@/components/panel/menu";
import { ReactNode } from "react";

interface LayoutDefaultProps {
  children: ReactNode;
}

export function LayoutDefault({ children }: LayoutDefaultProps) {
  return (
    <div className="h-screen w-screen">
      <Header />

      <div className="mt-4 flex flex-col items-center gap-4">
        <Menu />

        {children}
      </div>
    </div>
  );
}
