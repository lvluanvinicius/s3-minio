import { Skeleton } from '@nextui-org/react'

export function TableSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 6, 7, 8, 9, 10].map((line) => {
        return (
          <tr key={line} className="hover:bg-secondary/10">
            <td className="whitespace-nowrap py-2">
              <Skeleton className="w-min-[10rem] mx-2 h-8 rounded-md bg-secondary/10" />
            </td>
            <td className="whitespace-nowrap py-2">
              <Skeleton className="w-min-[10rem] mx-2 h-8 rounded-md bg-secondary/10" />
            </td>
            <td className="whitespace-nowrap py-2">
              <Skeleton className="w-min-[10rem] mx-2 h-8 rounded-md bg-secondary/10" />
            </td>
            <td className="whitespace-nowrap py-2">
              <Skeleton className="w-min-[10rem] mx-2 h-8 rounded-md bg-secondary/10" />
            </td>
            <td className="whitespace-nowrap py-2">
              <Skeleton className="w-min-[10rem] mx-2 h-8 rounded-md bg-secondary/10" />
            </td>
          </tr>
        )
      })}
    </>
  )
}
