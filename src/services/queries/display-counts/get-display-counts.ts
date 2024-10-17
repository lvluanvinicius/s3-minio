import { get } from '@/services/app'
import { toast } from 'sonner'

export async function getDisplayCounts() {
  const response = await get<DisplayCounts>('/api/display-counts', {
    headers: {
      Accept: 'application/json',
    },
  })

  if (response.status) {
    return response
  }

  toast.error(response.message)
  return null
}
