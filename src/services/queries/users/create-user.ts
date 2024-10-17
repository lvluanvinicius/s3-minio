import { post } from '@/services/app'
import { toast } from 'sonner'

interface CreateUser {
  user: {
    username: string
    password: string
    email: string
    name: string
  }
}

export async function createUser({ user }: CreateUser) {
  const response = await post(`/api/users`, user, {
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
