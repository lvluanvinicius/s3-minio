import { get } from '@/services/app'
import { ParsedUrlQuery } from 'querystring'
import { toast } from 'sonner'

interface GetS3Config {
  query: ParsedUrlQuery
}

export async function getS3Config({ query }: GetS3Config) {
  const queryParams = {} as { [key: string]: string }

  for (const index in query) {
    queryParams[index] = query[index] as string
  }

  const response = await get<ApiResponse<AppS3Config[]>>('/api/settings/s3', {
    queryParams: { ...queryParams },
    headers: {
      Accept: 'application/json',
    },
  })

  if (response.status) {
    return response.data
  }

  toast.error(response.message)
  return null
}
