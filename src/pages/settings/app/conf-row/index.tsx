import { Button } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCallback, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

interface ConfEditProps {
  conf: {
    id: string;
    value: string;
    name: string;
    description: string;
    bucket_id: string | null;
    created_at: string;
    updated_at: string;
  };
}

export function ConfRow({ conf }: ConfEditProps) {
  const [edit, setEdit] = useState(false);

  const handlerUpdate = useCallback(async function () {
    try {
      setEdit(!edit);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <tr className="hover:bg-secondary/10">
      <td className="whitespace-nowrap py-2 pl-2">{conf.name}</td>
      <td className="whitespace-nowrap py-2">{conf.value}</td>
      <td className="whitespace-nowrap py-2">{conf.description}</td>
      <td className="whitespace-nowrap py-2">{conf.bucket_id}</td>
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
          {edit ? (
            <>
              <Button
                variant="ghost"
                className=""
                size="sm"
                onPress={handlerUpdate}
              >
                <IoIosSave size={16} />
              </Button>
              <Button
                variant="ghost"
                className=""
                size="sm"
                onClick={() => setEdit(!edit)}
              >
                <IoCloseCircleOutline size={16} />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              className=""
              size="sm"
              onClick={() => setEdit(!edit)}
            >
              <FaEdit size={16} />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}
