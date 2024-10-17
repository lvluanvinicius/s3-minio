import { Paginate } from '@/components/panel/paginate'
import { Button, Input } from '@nextui-org/react'
import { ConfRow } from './conf-row'
import { getS3Config } from '@/services/queries/s3-config/get-config'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export function Page() {
  const router = useRouter()

  const { data: appS3Settings } = useQuery({
    queryKey: ['app-s3-settings', router.query],
    queryFn: () => getS3Config({ query: router.query }),
  })

  return (
    <div className="flex h-full w-[80%] flex-col items-center justify-between gap-4 rounded-md border bg-content1 p-6 shadow-sm shadow-black/40">
      <div className="flex w-full items-center gap-4">
        <Input
          placeholder="Buscar configuração..."
          className="rounded-sm shadow-sm shadow-black/20"
          radius="sm"
        />
        <Button radius="sm" className="rounded-sm shadow-sm shadow-black/20">
          Buscar
        </Button>
      </div>

      <table className="table w-full">
        <thead className="bg-content2">
          <tr className="text-left text-sm">
            <th className="whitespace-nowrap py-2 pl-2">Nome</th>
            <th className="whitespace-nowrap py-2">Valor</th>
            <th className="whitespace-nowrap py-2">Descrição</th>
            <th className="whitespace-nowrap py-2">Criado há</th>
            <th className="whitespace-nowrap py-2">Atualizado há</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {appS3Settings ? (
            appS3Settings.data.map((conf) => {
              return <ConfRow key={conf.id} conf={conf} />
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
      <Paginate />
    </div>
  )
}
