import { FetchError } from '@/services/app'
import { updateAppConfig } from '@/services/queries/app/update-config'
import { queryClient } from '@/services/queryClient'
import { Button, Input } from '@nextui-org/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useCallback, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoIosSave } from 'react-icons/io'
import { IoCloseCircleOutline, IoSettings } from 'react-icons/io5'
import { MdOutlineDescription } from 'react-icons/md'
import { toast } from 'sonner'

interface ConfEditProps {
  conf: AppConfig
}

export function ConfRow({ conf }: ConfEditProps) {
  const [edit, setEdit] = useState(false)

  const [config, setConfig] = useState<AppConfig>(conf)

  const handlerUpdate = useCallback(
    async function () {
      try {
        if (!config.description) {
          throw new Error('A descrição é obrigatória.')
        }

        if (!config.value) {
          throw new Error('O valor é obrigatório.')
        }

        const response = await updateAppConfig({
          config,
          config_id: config.id,
        })

        if (response && response.status) {
          toast.success(response.message)
          const cachedData = queryClient.getQueriesData<
            ApiResponse<AppConfig[]>
          >({
            queryKey: ['app-settings'],
          })

          cachedData.forEach(([cacheKey, cacheData]) => {
            if (!cacheData) {
              return null
            }

            queryClient.setQueryData<ApiResponse<AppConfig[]>>(cacheKey, {
              ...cacheData,
              data: cacheData.data.map((d) => {
                if (d.id === config.id) {
                  d = config
                }
                return d
              }),
            })
          })

          setEdit(false)

          return
        }

        throw new Error('Houve um erro ao tentar atualizar a configuração.')
      } catch (error) {
        if (error instanceof FetchError) {
          toast.error(error.message)
          return
        }

        if (error instanceof Error) {
          toast.error(error.message)
          return
        }

        toast.error(
          'Houve um erro desconhecido ao tentar editar a configuração.',
        )
      }
    },
    [setEdit, config],
  )

  if (edit) {
    return (
      <tr>
        <td className="whitespace-nowrap py-2 pl-2">{conf.name}</td>
        <td className="whitespace-nowrap py-2 pl-2">
          <Input
            defaultValue={config.value}
            startContent={<IoSettings size={20} color="gray" />}
            onChange={(event) => {
              setConfig((state) => {
                state.value = event.currentTarget.value
                return state
              })
            }}
          />
        </td>
        <td className="whitespace-nowrap py-2">
          <Input
            defaultValue={config.description}
            startContent={<MdOutlineDescription size={20} color="gray" />}
            onChange={(event) => {
              setConfig((state) => {
                state.description = event.currentTarget.value
                return state
              })
            }}
          />
        </td>
        <td className="whitespace-nowrap py-2">{conf.bucket_id}</td>
        <td className="whitespace-nowrap py-2">
          {formatDistanceToNow(conf.created_at, {
            addSuffix: true,
            locale: ptBR,
          })}
        </td>
        <td className="whitespace-nowrap py-2">
          {formatDistanceToNow(conf.updated_at, {
            addSuffix: true,
            locale: ptBR,
          })}
        </td>
        <td className="min-w-[10rem] whitespace-nowrap py-2">
          <div className="flex w-full items-center justify-end">
            <Button
              variant="ghost"
              className=""
              size="sm"
              onPress={handlerUpdate}
            >
              <IoIosSave size={16} />
            </Button>
            <Button
              variant="ghost"
              className=""
              size="sm"
              onClick={() => setEdit(!edit)}
            >
              <IoCloseCircleOutline size={16} />
            </Button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr className="hover:bg-secondary/10">
      <td className="whitespace-nowrap py-2 pl-2">{conf.name}</td>
      <td className="whitespace-nowrap py-2">{conf.value}</td>
      <td className="whitespace-nowrap py-2">{conf.description}</td>
      <td className="whitespace-nowrap py-2">{conf.bucket_id}</td>
      <td className="whitespace-nowrap py-2">
        {formatDistanceToNow(conf.created_at, {
          addSuffix: true,
          locale: ptBR,
        })}
      </td>
      <td className="whitespace-nowrap py-2">
        {formatDistanceToNow(conf.updated_at, {
          addSuffix: true,
          locale: ptBR,
        })}
      </td>
      <td className="min-w-[10rem] whitespace-nowrap py-2">
        <div className="flex w-full items-center justify-end">
          <Button
            variant="ghost"
            className=""
            size="sm"
            onClick={() => setEdit(!edit)}
          >
            <FaEdit size={16} />
          </Button>
        </div>
      </td>
    </tr>
  )
}
