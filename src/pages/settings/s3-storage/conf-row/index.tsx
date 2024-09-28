import { Button, Input } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCallback, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { IoCloseCircleOutline, IoSettings } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";

interface ConfigProps {
  id: string;
  value: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface ConfEditProps {
  conf: ConfigProps;
}
export function ConfRow({ conf }: ConfEditProps) {
  const [edit, setEdit] = useState(false);

  const [config, setConfig] = useState<ConfigProps>(conf);

  const handlerUpdate = useCallback(
    async function () {
      try {
        setEdit(false);
      } catch (error) {
        console.log(error);
      }
    },
    [setEdit],
  );

  if (edit) {
    return (
      <tr>
        <td className="whitespace-nowrap py-2 pl-2">{conf.name}</td>
        <td className="whitespace-nowrap py-2 pl-2">
          {
            <Input
              defaultValue={config.value}
              startContent={<IoSettings size={20} color="gray" />}
            />
          }
        </td>
        <td className="whitespace-nowrap py-2">
          {
            <Input
              defaultValue={config.description}
              startContent={<MdOutlineDescription size={20} color="gray" />}
            />
          }
        </td>
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
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-secondary/10">
      <td className="whitespace-nowrap py-2 pl-2">{conf.name}</td>
      <td className="whitespace-nowrap py-2">{conf.value}</td>
      <td className="whitespace-nowrap py-2">{conf.description}</td>
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
