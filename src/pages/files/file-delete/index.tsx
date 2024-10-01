import { FaRegTrashAlt } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "@/services/queries/files/delete-file";
import { FetchError } from "@/services/app";
import { queryClient } from "@/services/queryClient";

export function FileDelete({ fileId }: { fileId: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isDelete, setIsDelete] = useState(false);

  const { mutateAsync: deleteFileFunc } = useMutation({
    mutationFn: () => deleteFile({ file_id: fileId }),
  });

  const handleDelete = useCallback(async () => {
    try {
      setIsDelete(true);
      const del = await deleteFileFunc();

      if (del.status) {
        const cachedFolders = queryClient.getQueriesData<
          ApiResponse<{ result: FilesFolders[] }>
        >({
          queryKey: ["files-folders"],
        });

        cachedFolders.forEach(([cacheKey, cacheData]) => {
          if (!cacheData) {
            return null;
          }

          queryClient.setQueryData<ApiResponse<{ result: FilesFolders[] }>>(
            cacheKey,
            {
              ...cacheData,
              data: {
                result: cacheData.data.result.filter(
                  (d) => d.item_id !== fileId,
                ),
              },
            },
          );
        });

        toast.success(del.message);
        setIsDelete(false);
        onClose();
        return;
      }

      setIsDelete(false);

      throw new Error(del.message);
    } catch (error) {
      setIsDelete(false);

      if (error instanceof FetchError) {
        toast.error(error.message);
        return;
      }

      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error("Houve um erro desconhecido ao tentar excluír o arquivo.");
    }
  }, [fileId]);

  return (
    <>
      <Button onPress={onOpen} variant="ghost" className="" size="sm">
        <FaRegTrashAlt size={16} />
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="sm"
      >
        <ModalContent>
          <ModalBody>
            <ModalHeader>Confirma a exclusão?</ModalHeader>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button className="bg-primary text-white" onPress={handleDelete}>
              {isDelete ? (
                <>
                  <Spinner size="sm" color="current" />
                  Aguarde...
                </>
              ) : (
                "Confirmar"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
