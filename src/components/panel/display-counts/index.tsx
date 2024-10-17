import { getDisplayCounts } from '@/services/queries/display-counts/get-display-counts'
import { formatBytes } from '@/utils/formatter'
import { useQuery } from '@tanstack/react-query'

export function DisplayCounts() {
  const { data: display } = useQuery({
    queryKey: ['display-counts'],
    queryFn: getDisplayCounts,
  })

  if (!display) {
    return (
      <div className="w-full border-b border-black/50 pb-2">
        <div className="flex h-4 items-center gap-6 px-4 text-sm">...</div>
      </div>
    )
  }

  return (
    <div className="w-full border-b border-black/50 pb-2">
      <div className="flex items-center gap-6 px-4 text-sm">
        <div>
          <span className="font-bold">Uploads: </span>
          <span className="font-bold text-success">
            {formatBytes(display.data.histories.upload)}
          </span>
        </div>
        <div>
          <span className="font-bold">Downloads: </span>
          <span className="font-bold text-success">
            {formatBytes(display.data.histories.download)}
          </span>
        </div>
        <div>
          <span className="font-bold">Arquivos: </span>
          <span className="font-bold text-success">
            {display.data.total_files}
          </span>
        </div>
        <div>
          <span className="font-bold">Pastas: </span>
          <span className="font-bold text-success">
            {display.data.total_folders}
          </span>
        </div>
      </div>
    </div>
  )
}
