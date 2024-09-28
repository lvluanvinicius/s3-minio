import { Button, Input } from "@nextui-org/react";
import { UseLayout } from "../_layouts/use-layout";
import { Paginate } from "@/components/panel/paginate";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

export function Page() {
  const rows = [
    {
      id: "cm1ex8ims0000104nx4fiab55",
      name: "Luan Santos",
      email: "lvluansantos@gmail.com",
      username: "luan",
      created_at: "2024-09-23T11:25:43.636Z",
      updated_at: "2024-09-23T11:25:43.636Z",
    },
    {
      id: "cm1fj9v3w00068yj2gkvy89v0",
      name: "Fulano Irmão do Siclano",
      email: "flano@gmail.com",
      username: "fulano",
      created_at: "2024-09-23T21:42:38.013Z",
      updated_at: "2024-09-23T21:42:38.013Z",
    },
    {
      id: "cm1gwj71t0000f7m1fqw1wzow",
      name: "Administrador Padrão",
      email: "ti@grupocednet.com.br",
      username: "admin",
      created_at: "2024-09-24T20:41:34.577Z",
      updated_at: "2024-09-24T20:41:34.577Z",
    },
  ];

  return (
    <UseLayout>
      <div className="flex h-full w-[80%] flex-col items-center justify-between gap-4 rounded-md border bg-content1 p-6 shadow-sm shadow-black/40">
        <div className="flex w-full items-center gap-4">
          <Input
            placeholder="Buscar usuários..."
            className="rounded-sm shadow-sm shadow-black/20"
            radius="sm"
          />
          <Button radius="sm" className="rounded-sm shadow-sm shadow-black/20">
            Buscar
          </Button>
          <Button radius="sm" className="rounded-sm shadow-sm shadow-black/20">
            + Novo
          </Button>
        </div>

        <table className="table w-full">
          <thead className="bg-content2">
            <tr className="text-left text-sm">
              <th className="whitespace-nowrap py-2 pl-2">Nome</th>
              <th className="whitespace-nowrap py-2">E-mail</th>
              <th className="whitespace-nowrap py-2">Usuário</th>
              <th className="whitespace-nowrap py-2">Criado há</th>
              <th className="whitespace-nowrap py-2">Atualizado há</th>
              <th className="whitespace-nowrap py-2"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((conf) => {
              return (
                <tr className="hover:bg-secondary/10">
                  <td className="whitespace-nowrap py-2 pl-2">{conf.name}</td>
                  <td className="whitespace-nowrap py-2">{conf.email}</td>
                  <td className="whitespace-nowrap py-2">@{conf.username}</td>
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
                      <Button variant="ghost" className="" size="sm">
                        <FaEdit size={16} />
                      </Button>
                      <Button variant="ghost" className="" size="sm">
                        <FaRegTrashAlt size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paginate />
      </div>
    </UseLayout>
  );
}
