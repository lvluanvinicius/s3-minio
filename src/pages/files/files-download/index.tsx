import { Button } from "@nextui-org/react";
import { FaDownload } from "react-icons/fa";

export function FileDownload({ fileId }: { fileId: string }) {
  return (
    <Button variant="ghost" className="" size="sm">
      <FaDownload size={16} />
    </Button>
  );
}
