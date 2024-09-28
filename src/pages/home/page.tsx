import { DisplayCounts } from "@/components/panel/display-counts";
import { LayoutDefault } from "../_layouts/default";
import { Logs } from "./logs";

export function Page() {
  return (
    <LayoutDefault>
      <div className="flex h-full w-[80%] flex-col items-center justify-between gap-4 rounded-md border bg-content1 p-6 shadow-sm shadow-black/40">
        <DisplayCounts />
        <Logs />
      </div>
    </LayoutDefault>
  );
}
