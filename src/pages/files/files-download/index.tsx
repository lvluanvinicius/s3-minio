import { downloadFile } from "@/services/queries/files/download-file";
import { Button, Spinner } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { FaDownload } from "react-icons/fa";

export function FileDownload({ fileId }: { fileId: string }) {
  const [isDownload, setIsDownload] = useState(false);

  const handleDownload = useCallback(
    async function () {
      try {
        setIsDownload(true);
        await downloadFile({ file_id: fileId });
        setIsDownload(false);
        return;
      } catch (error) {
        setIsDownload(false);
        return;
      }
    },
    [fileId],
  );

  return (
    <Button onPress={handleDownload} variant="ghost" className="" size="sm">
      {isDownload ? (
        <Spinner size="sm" color="current" />
      ) : (
        <FaDownload size={16} />
      )}
    </Button>
  );
}
