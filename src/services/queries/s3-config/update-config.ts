import { put } from '@/services/app'
import { toast } from 'sonner'

interface UpdateS3Config {
  config: AppS3Config
  config_id: string
}

export async function updateS3Config({ config, config_id }: UpdateS3Config) {
  const update = await put(
    `/api/settings/s3?config_id=${config_id}`,
    {
      value: config.value,
      description: config.description,
      name: config.name,
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
