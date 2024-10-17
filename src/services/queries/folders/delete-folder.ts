import { del } from '@/services/app'

interface DeleteFolder {
  folder_id: string
}

export async function deleteFolder({ folder_id }: DeleteFolder) {
  const response = await del(`/api/folders?folder_id=${folder_id}`, {
    headers: { Accept: 'application/json' },
  })

  if (response.status) {
    return response
  }

  throw new Error(response.message)
}
