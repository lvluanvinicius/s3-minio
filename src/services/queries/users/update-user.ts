import { put } from '@/services/app'
import { toast } from 'sonner'

interface UpdateUser {
  user: {
    username: string
    password: string | null
    email: string
    name: string
  }
  user_id: string
}

export async function updateUser({ user, user_id }: UpdateUser) {
  const update = await put(`/api/users?user_id=${user_id}`, user, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (update.status) {
    return update
  }

  toast.error(update.message)
}
