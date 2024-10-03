import { Button, Input } from "@nextui-org/react";
import { UseLayout } from "../_layouts/use-layout";
import { Paginate } from "@/components/panel/paginate";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/queries/users/get-users";
import { Update } from "./update";
import { UserDelete } from "./user-delete";
import { Create } from "./create";

export function Page() {
  const router = useRouter();

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ query: router.query }),
  });

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
          <Create />
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
            {users ? (
              users.data.map((user) => {
                return (
                  <tr key={user.id} className="hover:bg-secondary/10">
                    <td className="whitespace-nowrap py-2 pl-2">{user.name}</td>
                    <td className="whitespace-nowrap py-2">{user.email}</td>
                    <td className="whitespace-nowrap py-2">@{user.username}</td>
                    <td className="whitespace-nowrap py-2">
                      {formatDistanceToNow(user.created_at, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td className="whitespace-nowrap py-2">
                      {formatDistanceToNow(user.updated_at, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td className="min-w-[10rem] whitespace-nowrap py-2">
                      <div className="flex w-full items-center justify-end">
                        <Update user={user} />

                        <UserDelete user_id={user.id} />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <Paginate />
      </div>
    </UseLayout>
  );
}
