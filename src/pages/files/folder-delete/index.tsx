import { FaRegTrashAlt } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useCallback } from "react";
import { toast } from "sonner";

export function FolderDelete({ foldId }: { foldId: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleDelete = useCallback(async () => {
    try {
      toast.success(foldId);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }, [foldId]);

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
        classNames={
          {
            //   body: "py-6",
            //   backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
            //   base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
            //   header: "border-b-[1px] border-[#292f46]",
            //   footer: "border-t-[1px] border-[#292f46]",
            //   closeButton: "hover:bg-white/5 active:bg-white/10",
          }
        }
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
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
