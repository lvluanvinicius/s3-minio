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
import { FetchError } from "@/services/app";
import { queryClient } from "@/services/queryClient";
import { deleteUser } from "@/services/queries/users/delete-user";

export function UserDelete({ user_id }: { user_id: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isDelete, setIsDelete] = useState(false);

  const { mutateAsync: deleteUserFunc } = useMutation({
    mutationFn: () => deleteUser({ user_id }),
  });

  const handleDelete = useCallback(async () => {
    try {
      setIsDelete(true);
      const del = await deleteUserFunc();

      if (del.status) {
        const cachedUsers = queryClient.getQueriesData<
          ApiResponse<UserInterface[]>
        >({
          queryKey: ["users"],
        });

        cachedUsers.forEach(([cacheKey, cacheData]) => {
          if (!cacheData) {
            return null;
          }

          queryClient.setQueryData<ApiResponse<UserInterface[]>>(cacheKey, {
            ...cacheData,
            data: cacheData.data.filter((d) => d.id !== user_id),
          });
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
  }, [user_id]);

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
