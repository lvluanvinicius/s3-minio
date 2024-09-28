import { DisplayCounts } from "@/components/panel/display-counts";
import { Logs } from "./logs";
import { UseLayout } from "../_layouts/use-layout";

export function Page() {
  return (
    <UseLayout>
      <div className="flex h-full w-[80%] flex-col items-center justify-between gap-4 rounded-md border bg-content1 p-6 shadow-sm shadow-black/40">
        <DisplayCounts />
        <Logs />
      </div>
    </UseLayout>
  );
}
