import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { LayoutDefault } from "../_layouts/default";

export function Page() {
  const rows = [
    {
      item_id: "cm1kt9h23000z14fu1et5y1vl",
      item_name: "app_jocapi",
      item_type: "folder",
      item_created_at: "2024-09-27T14:21:06.842Z",
      item_updated_at: "2024-09-27T14:21:06.842Z",
      item_size: null,
      item_owner: "@luan",
    },
    {
      item_id: "cm1fhcxmv00058yj2jdugngrg",
      item_name: "luan",
      item_type: "folder",
      item_created_at: "2024-09-23T19:57:45.264Z",
      item_updated_at: "2024-09-23T19:57:45.264Z",
      item_size: null,
      item_owner: "@fulano",
    },
    {
      item_id: "cm1gg8jzv00075btfgysynrvy",
      item_name: "pasta teste",
      item_type: "folder",
      item_created_at: "2024-09-24T13:05:24.283Z",
      item_updated_at: "2024-09-24T13:05:24.283Z",
      item_size: null,
      item_owner: "@luan",
    },
    {
      item_id: "cm1ggcfg5000b5btfj8t081iu",
      item_name: "uma nova pasta",
      item_type: "folder",
      item_created_at: "2024-09-24T13:08:25.013Z",
      item_updated_at: "2024-09-24T13:08:25.013Z",
      item_size: null,
      item_owner: "@luan",
    },
    {
      item_id: "cm1ggc9p800095btfqx3qz3o7",
      item_name: "uma_nova_pasta",
      item_type: "folder",
      item_created_at: "2024-09-24T13:08:17.565Z",
      item_updated_at: "2024-09-24T13:08:17.565Z",
      item_size: null,
      item_owner: "@luan",
    },
    {
      item_id: "cm1kx45by000710u0r3jn4qkf",
      item_name: "1727453336621-jocapi-logo.png",
      item_type: "file",
      item_created_at: "2024-09-27T16:08:56.830Z",
      item_updated_at: "2024-09-27T16:08:56.830Z",
      item_size: 18597,
      item_owner: "@luan",
    },
  ];

  const columns = [
    {
      key: "item_name",
      label: "NAME",
    },
    {
      key: "item_size",
      label: "Tamanho",
    },
    {
      key: "item_created_at",
      label: "Lançado há",
    },
    {
      key: "item_owner",
      label: "Criado por",
    },
  ];

  return (
    <LayoutDefault>
      <div className="flex h-full w-[80%] items-center justify-between rounded-md border bg-content1 p-2">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows} emptyContent={"Nenhum arquivo encontrado."}>
            {(item) => {
              return (
                <TableRow key={item.item_id}>
                  {(columnKey) => {
                    if (item.item_type === "file") {
                      return (
                        <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                      );
                    }

                    if (item.item_type === "folder") {
                      return (
                        <TableCell>
                          <div className="font-bold">
                            {getKeyValue(item, columnKey)}
                          </div>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    );
                  }}
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
      </div>
    </LayoutDefault>
  );
}
