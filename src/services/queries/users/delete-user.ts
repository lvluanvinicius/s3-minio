import { del } from '@/services/app'
import { toast } from 'sonner'

interface DeleteUser {
  user_id: string
}

export async function deleteUser({ user_id }: DeleteUser) {
  const response = await del(`/api/users?user_id=${user_id}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (response.status) {
    return response
  }

  toast.error(response.message)
  throw new Error(response.message)
}
