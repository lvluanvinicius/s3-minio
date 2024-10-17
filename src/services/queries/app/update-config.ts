import { put } from '@/services/app'
import { toast } from 'sonner'

interface UpdateAppConfig {
  config: AppConfig
  config_id: string
}

export async function updateAppConfig({ config, config_id }: UpdateAppConfig) {
  const update = await put(
    `/api/settings/app?config_id=${config_id}`,
    {
      value: config.value,
      description: config.description,
      bucket_id: config.bucket_id,
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
