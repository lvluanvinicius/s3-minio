import { formatBytes } from "@/utils/formatter";

import { Paginate } from "@/components/panel/paginate";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DisplayCounts } from "@/components/panel/display-counts";
import { Button, Input } from "@nextui-org/react";

import { FaFolder } from "react-icons/fa";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
// import { IoCloseCircleOutline } from "react-icons/io5";
import { UseLayout } from "../_layouts/use-layout";

export function Page() {
  const rows = [
    {
      item_id: "cm1kt9h23000z14fu1et5y1vl",
      item_name: "app_jocapi",
      item_type: "folder",
      item_created_at: "2024-09-27T14:21:06.842Z",
      item_updated_at: "2024-09-27T14:21:06.842Z",
      item_size: null,
      item_total_files: 1,
      item_owner: "@luan",
    },
    {
      item_id: "cm1fhcxmv00058yj2jdugngrg",
      item_name: "luan",
      item_type: "folder",
      item_created_at: "2024-09-23T19:57:45.264Z",
      item_updated_at: "2024-09-23T19:57:45.264Z",
      item_size: null,
      item_total_files: 3,
      item_owner: "@fulano",
    },
    {
      item_id: "cm1gg8jzv00075btfgysynrvy",
      item_name: "pasta teste",
      item_type: "folder",
      item_created_at: "2024-09-24T13:05:24.283Z",
      item_updated_at: "2024-09-24T13:05:24.283Z",
      item_size: null,
      item_total_files: 0,
      item_owner: "@luan",
    },
    {
      item_id: "cm1ggcfg5000b5btfj8t081iu",
      item_name: "uma nova pasta",
      item_type: "folder",
      item_created_at: "2024-09-24T13:08:25.013Z",
      item_updated_at: "2024-09-24T13:08:25.013Z",
      item_size: null,
      item_total_files: 0,
      item_owner: "@luan",
    },
    {
      item_id: "cm1ggc9p800095btfqx3qz3o7",
      item_name: "uma_nova_pasta",
      item_type: "folder",
      item_created_at: "2024-09-24T13:08:17.565Z",
      item_updated_at: "2024-09-24T13:08:17.565Z",
      item_size: null,
      item_total_files: 0,
      item_owner: "@luan",
    },
    {
      item_id: "cm1m35r9r000l45hrkqpb6wt9",
      item_name: "1727523955721-bedcd076-5f75-4964-aafd-2dba1e50e1ed.jpeg",
      item_type: "file",
      item_created_at: "2024-09-28T11:45:55.792Z",
      item_updated_at: "2024-09-28T11:45:55.792Z",
      item_size: 22749,
      item_total_files: null,
      item_owner: "@luan",
    },
    {
      item_id: "cm1m360yr000n45hr729uksal",
      item_name: "1727523968316-Screenshot_1.png",
      item_type: "file",
      item_created_at: "2024-09-28T11:46:08.355Z",
      item_updated_at: "2024-09-28T11:46:08.355Z",
      item_size: 15028,
      item_total_files: null,
      item_owner: "@luan",
    },
    {
      item_id: "cm1m36p1e000p45hrwc5ogt1z",
      item_name: "1727523999501-Screenshot_1.png",
      item_type: "file",
      item_created_at: "2024-09-28T11:46:39.554Z",
      item_updated_at: "2024-09-28T11:46:39.554Z",
      item_size: 15028,
      item_total_files: null,
      item_owner: "@luan",
    },
    {
      item_id: "cm1m3hg0k0005116cf4lz6sbv",
      item_name: "1727524500989-Screenshot_1.png",
      item_type: "file",
      item_created_at: "2024-09-28T11:55:01.076Z",
      item_updated_at: "2024-09-28T11:55:01.076Z",
      item_size: 15028,
      item_total_files: null,
      item_owner: "@luan",
    },
  ];

  return (
    <UseLayout>
      <div className="flex h-full w-[80%] flex-col items-center justify-between gap-4 rounded-md border bg-content1 p-6 shadow-sm shadow-black/40">
        <DisplayCounts />

        <div className="flex w-full items-center gap-4">
          <Input
            placeholder="Buscar arquivo..."
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
              <th className="whitespace-nowrap py-2">Tamanho</th>
              <th className="whitespace-nowrap py-2">Lançado há</th>
              <th className="whitespace-nowrap py-2">Criado por</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-secondary/10">
              <td className="whitespace-nowrap py-2 pl-2">
                <button
                  className="flex gap-1 bg-none text-sm font-bold"
                  onClick={console.log}
                >
                  <FaFolder size={20} color="gray" /> ...
                </button>
              </td>
              <td className="whitespace-nowrap py-2"></td>
              <td className="whitespace-nowrap py-2"></td>
              <td className="whitespace-nowrap py-2"></td>
              <td className="whitespace-nowrap py-2"></td>
            </tr>
            {rows.map((item) => {
              const size = item.item_size ? item.item_size : 0;

              if (item.item_type === "file") {
                return (
                  <tr className="text-sm hover:bg-secondary/10">
                    <td className="whitespace-nowrap py-2 pl-2">
                      {item.item_name}
                    </td>
                    <td className="whitespace-nowrap py-2">
                      {formatBytes(size, 2)}
                    </td>
                    <td className="whitespace-nowrap py-2">
                      {formatDistanceToNow(item.item_created_at, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td className="whitespace-nowrap py-2">
                      {item.item_owner}
                    </td>
                    <td className="whitespace-nowrap py-2">
                      <div className="flex items-center justify-end">
                        <Button variant="ghost" className="" size="sm">
                          <FaRegTrashAlt size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              }

              if (item.item_type === "folder") {
                return (
                  <tr className="text-sm hover:bg-secondary/10">
                    <td className="whitespace-nowrap py-2 pl-2">
                      <div className="flex gap-1 font-bold">
                        <FaFolder size={20} color="gray" />
                        {item.item_name}
                      </div>
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
                    <td className="whitespace-nowrap py-2">
                      {item.item_owner}
                    </td>
                    <td className="min-w-[10rem] whitespace-nowrap py-2">
                      <div className="flex w-full items-center justify-end">
                        {/* <Button variant="ghost" className="" size="sm">
                          <IoCloseCircleOutline size={16} />
                        </Button> */}
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
              }
            })}
          </tbody>
        </table>
        <Paginate />
      </div>
    </UseLayout>
  );
}
