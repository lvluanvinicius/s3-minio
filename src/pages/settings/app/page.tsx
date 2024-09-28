import { Paginate } from "@/components/panel/paginate";
import { Button, Input } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ConfRow } from "./conf-row";

export function Page() {
  const rows = [
    {
      id: "cm1guqa0g00006hurt3yg2phy",
      value: "Jocapi",
      name: "app_name",
      description: "Guarda o nome do aplicativo.",
      bucket_id: null,
      created_at: "2024-09-24T19:51:05.777Z",
      updated_at: "2024-09-24T19:52:56.000Z",
    },
    {
      id: "cm1ktgb9l001614fuux95knah",
      value: "1727453336621-jocapi-logo.png",
      name: "app_logo",
      description: "Guarda o nome da imagem do logo do aplicativo.",
      bucket_id: null,
      created_at: "2024-09-27T14:26:25.929Z",
      updated_at: "2024-09-27T14:26:25.929Z",
    },
    {
      id: "cm1kvwu3z00047d1eih9yb6zx",
      value: "",
      name: "app_bucket",
      description: "Guarda o ID da bucket ativa no sistema.",
      bucket_id: "cm1eyx7rl0008104nl580qopb",
      created_at: "2024-09-27T15:35:16.079Z",
      updated_at: "2024-09-27T15:35:16.079Z",
    },
  ] as {
    id: string;
    value: string;
    name: string;
    description: string;
    bucket_id: string | null;
    created_at: string;
    updated_at: string;
  }[];

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
            <th className="whitespace-nowrap py-2">ID do Bucket</th>
            <th className="whitespace-nowrap py-2">Criado há</th>
            <th className="whitespace-nowrap py-2">Atualizado há</th>
            <th className="whitespace-nowrap py-2"></th>
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
