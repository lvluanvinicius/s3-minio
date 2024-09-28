import { Paginate } from "@/components/panel/paginate";
import { Button, Input } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { ConfRow } from "./conf-row";

export function Page() {
  const rows = [
    {
      id: "cm1gk6ngi0000m716rbn9tsz7",
      value: "https://prv-s3.grupocednet.com.br",
      name: "api_url",
      description: "Url de vizualização de arquivos.",
      created_at: "2024-09-24T14:55:53.923Z",
      updated_at: "2024-09-24T18:08:44.000Z",
    },
    {
      id: "cm1gk9ytp0001m716cldiga40",
      value: "https://s3.grupocednet.com.br",
      name: "console_url",
      description: "Url de acesso ao console web.",
      created_at: "2024-09-24T14:58:28.621Z",
      updated_at: "2024-09-24T18:16:55.000Z",
    },
    {
      id: "cm1gklt2g0002m716b43mewaw",
      value: "tester",
      name: "sdk_console_username",
      description: "Usuário de acesso ao console e biblioteca SDK.",
      created_at: "2024-09-24T15:07:41.033Z",
      updated_at: "2024-09-24T15:07:41.033Z",
    },
    {
      id: "cm1gre24o0000rhic1woxc0qu",
      value: "443",
      name: "console_port",
      description: "Porta de acesso HTTPS.",
      created_at: "2024-09-24T18:17:36.840Z",
      updated_at: "2024-09-24T19:21:37.000Z",
    },
    {
      id: "cm1grhb8c0001rhicb8njcbmn",
      value: "true",
      name: "use_ssl",
      description: "Ativa o uso de SSL.",
      created_at: "2024-09-24T18:20:08.604Z",
      updated_at: "2024-09-24T18:20:08.604Z",
    },
    {
      id: "cm1grk8tf0002rhic0qk9h3e4",
      value: "@Bw37!Xy29%",
      name: "sdk_console_password",
      description: "Senha de acesso ao console e biblioteca SDK.",
      created_at: "2024-09-24T18:22:25.443Z",
      updated_at: "2024-09-24T18:22:25.443Z",
    },
  ];

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
        <Button radius="sm" className="rounded-sm shadow-sm shadow-black/20">
          + Nova
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
          {rows.map((conf) => {
            return <ConfRow key={conf.id} conf={conf} />;
          })}
        </tbody>
      </table>
      <Paginate />
    </div>
  );
}
