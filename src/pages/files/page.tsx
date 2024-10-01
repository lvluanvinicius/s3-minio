import { formatBytes } from "@/utils/formatter";

import { Paginate } from "@/components/panel/paginate";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DisplayCounts } from "@/components/panel/display-counts";
import { UseLayout } from "../_layouts/use-layout";
import { FolderEdit } from "./folder-edit";
import { FileDelete } from "./file-delete";
import { Search } from "@/components/panel/search";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { getFilesFolders } from "@/services/queries/files/get-files-folders";
import { useRouter } from "next/router";
import { TableSkeleton } from "./skeleton";
import { FaFolder } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FileDownload } from "./files-download";

export function Page() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  const { data: filesFolders } = useQuery({
    queryKey: ["files-folders", router.query],
    queryFn: () => getFilesFolders({ query: router.query }),
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <UseLayout>
      <Helmet title="Arquivos" />

      <div className="flex h-full w-[80%] flex-col items-center justify-between gap-4 rounded-md border bg-content1 p-6 shadow-sm shadow-black/40">
        <DisplayCounts />

        <Search />

        <table className="table w-full">
          <thead className="bg-content2">
            <tr className="text-left text-sm">
              <th className="whitespace-nowrap py-2 pl-2">Nome</th>
              <th className="whitespace-nowrap py-2">Tamanho</th>
              <th className="whitespace-nowrap py-2">Lançado há</th>
              <th className="whitespace-nowrap py-2">Criado por</th>
              <th className="whitespace-nowrap py-2"></th>
            </tr>
          </thead>

          <tbody>
            {router.query.folder_id && (
              <tr className="hover:bg-secondary/10">
                <td className="whitespace-nowrap py-2 pl-2">
                  <button
                    className="flex gap-1 bg-none text-sm font-bold"
                    onClick={() => router.back()}
                  >
                    <FaFolder size={20} color="gray" /> ...
                  </button>
                </td>
                <td className="whitespace-nowrap py-2"></td>
                <td className="whitespace-nowrap py-2"></td>
                <td className="whitespace-nowrap py-2"></td>
                <td className="w-min-[5rem] whitespace-nowrap py-2"></td>
              </tr>
            )}

            {filesFolders ? (
              filesFolders.data.result.map((item) => {
                const size = item.item_size ? item.item_size : 0;

                if (item.item_type === "file") {
                  return (
                    <tr
                      key={item.item_id}
                      className="text-sm hover:bg-secondary/10"
                    >
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
                          <FileDownload fileId={item.item_id} />
                          <FileDelete fileId={item.item_id} />
                        </div>
                      </td>
                    </tr>
                  );
                }

                if (item.item_type === "folder") {
                  return <FolderEdit key={item.item_id} item={item} />;
                }
              })
            ) : (
              <TableSkeleton />
            )}
          </tbody>
        </table>

        <Paginate />
      </div>
    </UseLayout>
  );
}
