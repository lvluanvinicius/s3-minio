import Link from "next/link";

export function Home() {
  return (
    <Link
      href={"/home"}
      className="flex h-full cursor-pointer items-center gap-1 border-b-2 border-transparent px-6 text-sm hover:border-primary/30 hover:opacity-50"
    >
      Início
    </Link>
  );
}
