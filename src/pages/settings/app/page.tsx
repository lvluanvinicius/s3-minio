import { Paginate } from '@/components/panel/paginate'
import { Button, Input } from '@nextui-org/react'
import { ConfRow } from './conf-row'
import { useQuery } from '@tanstack/react-query'
import { getConfig } from '@/services/queries/app/get-config'
import { useRouter } from 'next/router'

export function Page() {
  const router = useRouter()

  const { data: appSettings } = useQuery({
    queryKey: ['app-settings', router.query],
    queryFn: () => getConfig({ query: router.query }),
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
            <th className="whitespace-nowrap py-2">ID do Bucket</th>
            <th className="whitespace-nowrap py-2">Criado há</th>
            <th className="whitespace-nowrap py-2">Atualizado há</th>
            <th className="whitespace-nowrap py-2"></th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {appSettings ? (
            appSettings.data.map((conf) => {
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
