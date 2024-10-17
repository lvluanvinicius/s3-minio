import { Skeleton } from '@nextui-org/react'

export function HeaderSkeleton() {
  return (
    <header className="flex h-[4rem] w-full items-center justify-center bg-primary text-white">
      <div className="flex h-full w-[80%] items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="h-full w-8 gap-2">
            <Skeleton className="h-8 rounded-full opacity-45" />
          </div>
          <Skeleton className="w-32 rounded-lg opacity-45">
            <div className="h-8 rounded-lg"></div>
          </Skeleton>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <Skeleton className="flex h-10 w-10 rounded-full opacity-45" />
          </div>
          <div className="flex w-36 flex-1 flex-col gap-2 border opacity-45">
            <Skeleton className="w-5/5 h-3.5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      </div>
    </header>
  )
}
