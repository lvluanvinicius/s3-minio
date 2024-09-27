import { Home } from "./home";
import { Settings } from "./settings";
import { Users } from "./users";
import { Files } from "./files";

export function Menu() {
  return (
    <div className="flex h-10 w-[80%] items-center justify-between rounded-sm border bg-content1 shadow-sm shadow-black/40">
      <div className="flex h-full items-center">
        <Home />

        <div className="h-full w-[1px] bg-white/70" />

        <Files />

        <div className="h-full w-[1px] bg-white/70" />

        <Users />

        <div className="h-full w-[1px] bg-white/70" />

        <Settings />
      </div>
    </div>
  );
}
