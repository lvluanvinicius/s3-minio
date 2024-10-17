import { get } from '@/services/app'
import { ParsedUrlQuery } from 'querystring'
import { toast } from 'sonner'

interface GetConfig {
  query: ParsedUrlQuery
}

export async function getConfig({ query }: GetConfig) {
  const queryParams = {} as { [key: string]: string }

  for (const index in query) {
    queryParams[index] = query[index] as string
  }

  const response = await get<ApiResponse<AppConfig[]>>('/api/settings/app', {
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
