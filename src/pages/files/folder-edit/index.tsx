import { Button, Input } from '@nextui-org/react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useCallback, useState } from 'react'
import { FaEdit, FaFolder } from 'react-icons/fa'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { IoIosSave } from 'react-icons/io'
import { FolderDelete } from '../folder-delete'
import { useRouter } from 'next/router'
import { transformSearchParams } from '@/utils/urls'
import { useMutation } from '@tanstack/react-query'
import { updateFolder } from '@/services/queries/folders/update-folder'
import { toast } from 'sonner'
import { FetchError } from '@/services/app'
import { queryClient } from '@/services/queryClient'

interface FolderEdit {
  item: FilesFolders
}

export function FolderEdit({ item }: FolderEdit) {
  const router = useRouter()
  const [edit, setEdit] = useState(false)
  const [valueName, setValueName] = useState(item.item_name)

  const { mutateAsync: updateFunc } = useMutation({
    mutationFn: () =>
      updateFolder({
        folder_name: valueName,
        folder_id: item.item_id,
      }),
  })

  const handleChangeFolder = useCallback(
    (folder: string | null) => {
      if (!folder) {
        delete router.query.folder_id
      }

      router.query.folder_id = folder as string

      const queryParams = transformSearchParams(router.query)

      router.push({
        pathname: router.pathname,
        query: queryParams,
      })
    },
    [router],
  )

  const handlerUpdateFolder = useCallback(
    async function () {
      try {
        if (valueName === '' || !valueName) {
          throw new Error('Nenhum valor foi informado para o nome da pasta.')
        }

        // Enviar alterações.
        const response = await updateFunc()

        if (response && response.status) {
          setEdit(false)
          toast.success(response.message)

          const cachedData = queryClient.getQueriesData<
            ApiResponse<{ result: FilesFolders[] }>
          >({
            queryKey: ['files-folders'],
          })

          cachedData.forEach(([cacheKey, cachedData]) => {
            if (!cachedData) {
              return null
            }

            queryClient.setQueryData<ApiResponse<{ result: FilesFolders[] }>>(
              cacheKey,
              {
                ...cachedData,
                data: {
                  result: cachedData.data.result.map((d) => {
                    if (d.item_id === item.item_id) {
                      return { ...d, item_name: valueName }
                    }

                    return d
                  }),
                },
              },
            )
          })
        }
      } catch (error) {
        if (error instanceof FetchError) {
          toast.error(error.message)
          return
        }

        if (error instanceof Error) {
          toast.error(error.message)
          return
        }

        toast.error('Houve um erro desconhecido ao tentar atualizar a pasta.')
      }
    },
    [valueName, setEdit, item.item_id, updateFunc],
  )

  return (
    <tr className="text-sm hover:bg-secondary/10">
      <td className="whitespace-nowrap py-2 pl-2">
        {edit ? (
          <Input
            defaultValue={valueName}
            onChange={(e) => setValueName(e.currentTarget.value)}
            startContent={<FaFolder size={20} color="gray" />}
          />
        ) : (
          <button
            className="flex gap-1 border-black font-bold hover:border-b"
            onClick={() => handleChangeFolder(item.item_id)}
          >
            <FaFolder size={20} color="gray" />
            {item.item_name}/
          </button>
        )}
      </td>
      <td className="whitespace-nowrap py-2">
        {item.item_total_files} iten(s)
      </td>
      <td className="whitespace-nowrap py-2">
        {formatDistanceToNow(item.item_created_at, {
          addSuffix: true,
          locale: ptBR,
        })}
      </td>
      <td className="whitespace-nowrap py-2">{item.item_owner}</td>
      <td className="min-w-[10rem] whitespace-nowrap py-2">
        <div className="flex w-full items-center justify-end">
          {edit ? (
            <>
              <Button
                variant="ghost"
                className=""
                size="sm"
                onPress={handlerUpdateFolder}
              >
                <IoIosSave size={16} />
              </Button>
              <Button
                variant="ghost"
                className=""
                size="sm"
                onClick={() => setEdit(false)}
              >
                <IoCloseCircleOutline size={16} />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              className=""
              size="sm"
              onClick={() => setEdit(true)}
            >
              <FaEdit size={16} />
            </Button>
          )}

          <FolderDelete foldId={item.item_id} />
        </div>
      </td>
    </tr>
  )
}
