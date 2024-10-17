import { get } from '@/services/app'
import { ParsedUrlQuery } from 'querystring'
import { toast } from 'sonner'

interface GetFilesFoldersProps {
  query: ParsedUrlQuery
}

export async function getFilesFolders({ query }: GetFilesFoldersProps) {
  const queryParams = {} as { [key: string]: string }

  for (const index in query) {
    queryParams[index] = query[index] as string
  }

  const response = await get<ApiResponse<{ result: FilesFolders[] }>>(
    '/api/files',
    {
      queryParams: { ...queryParams },
      headers: {
        Accept: 'application/json',
      },
    },
  )

  if (response.status) {
    return response.data
  }

  toast.error(response.message)
  return null
}
