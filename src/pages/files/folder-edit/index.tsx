import { Button, Input } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCallback, useState } from "react";
import { FaEdit, FaFolder } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { FolderDelete } from "../folder-delete";

interface FolderEdit {
  item: {
    item_id: string;
    item_name: string;
    item_type: string;
    item_created_at: string;
    item_updated_at: string;
    item_size: number | null;
    item_total_files: number | null;
    item_owner: string;
  };
}

export function FolderEdit({ item }: FolderEdit) {
  const [edit, setEdit] = useState(false);
  const [valueName, setValueName] = useState(item.item_name);

  const updateFolder = useCallback(
    async function () {
      try {
        if (valueName === "" || !valueName) {
          throw new Error("Nenhum valor foi informado para o nome da pasta.");
        }

        console.log(valueName);
        setEdit(false);
      } catch (error) {
        console.log(error);
      }
    },
    [valueName],
  );

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
          <div className="flex gap-1 font-bold">
            <FaFolder size={20} color="gray" />
            {item.item_name}
          </div>
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
                onPress={updateFolder}
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
  );
}
