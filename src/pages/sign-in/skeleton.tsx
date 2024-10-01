import { Skeleton } from "@nextui-org/react";

export function SkeletonSignIn() {
  return (
    <div className="fixed left-[50%] top-[50%] flex h-[28rem] w-[30rem] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-xl bg-primary text-white shadow-md shadow-primary">
      <div className="flex h-[6rem] w-full flex-col items-center justify-center border-b border-white/50">
        <div className="w-[3.5rem]">
          <Skeleton className="h-[3.5rem] w-[3.5rem] rounded-full opacity-60"></Skeleton>
        </div>
      </div>

      <div className="flex w-full items-center justify-center py-3 text-center">
        <Skeleton className="w-[18rem] rounded-md opacity-60">
          Faça login para continuar
        </Skeleton>
      </div>

      <div className="flex flex-col gap-4 px-12">
        <Skeleton className="h-12 w-full rounded-md opacity-60" />
        <Skeleton className="h-12 w-full rounded-md opacity-60" />
        <Skeleton className="h-12 w-full rounded-md opacity-60" />
      </div>

      <div className="flex w-full items-center justify-between px-12">
        <div />
        <a href="mailto:lvluansantos@gmail.com" className="opacity-35">
          S3 Api Content
        </a>
      </div>
    </div>
  );
}
