import { put } from '@/services/app'
import { toast } from 'sonner'

interface UpdateFolder {
  folder_name: string
  folder_id: string
}

export async function updateFolder({ folder_name, folder_id }: UpdateFolder) {
  const update = await put(
    `/api/folders?folder_id=${folder_id}`,
    {
      folder_name,
    },
    {
      headers: {
        Accept: 'application/json',
      },
    },
  )

  if (update.status) {
    return update
  }

  toast.error(update.message)
}
