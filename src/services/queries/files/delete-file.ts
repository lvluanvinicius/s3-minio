import { del } from '@/services/app'

interface DeleteFile {
  file_id: string
}

export async function deleteFile({ file_id }: DeleteFile) {
  const response = await del(`/api/files?file_id=${file_id}`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (response.status) {
    return response
  }

  throw new Error(response.message)
}
