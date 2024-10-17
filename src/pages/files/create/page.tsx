import { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard } from "@uppy/react";
import { useQuery } from "@tanstack/react-query";
import { getAppConfig } from "@/services/queries/app/app-config";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

export function Page() {
  const {
    data: appConfig,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["app-header-settings"],
    queryFn: getAppConfig,
  });

  // Estado para inicializar o Uppy somente após validação
  const [uppyInstance, setUppyInstance] = useState<Uppy | null>(null);

  useEffect(() => {
    if (appConfig && appConfig.data?.app_bucket_id) {
      // Inicialize o Uppy apenas se o appConfig estiver disponível e for válido
      const uppy = new Uppy({
        restrictions: { maxNumberOfFiles: 5 },
        autoProceed: false,
        meta: { bucket_id: appConfig.data.app_bucket_id },
      });

      // Configure o plugin XHRUpload
      if (!uppy.getPlugin("XHRUpload")) {
        uppy.use(XHRUpload, {
          endpoint: `/api/files/upload?bucket_id=${appConfig.data.app_bucket_id}`,
          fieldName: "file",
          formData: true,
          limit: 1,
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        });
      }

      if (uppy) {
        setUppyInstance(uppy);
      }

      // Cleanup ao desmontar o componente
      return () => {
        uppy.clear();
      };
    }
  }, [appConfig, setUppyInstance]);

  if (isLoading) return <p>Carregando configuração...</p>;
  if (isError) return <p>Erro ao carregar configuração</p>;

  return (
    <div className="flex w-[80%] flex-col items-center justify-between gap-4 rounded-md border bg-content1 p-6 shadow-md shadow-black/40">
      <div className="h-[400px] w-full border">
        {uppyInstance ? (
          <div className="h-[25rem] w-full">
            <Dashboard
              uppy={uppyInstance}
              proudlyDisplayPoweredByUppy={false}
              note="Apenas arquivos de até 5GB são permitidos."
              width="100%"
              height={400}
              lang="pt-BR"
            />
          </div>
        ) : (
          <p>Preparando uploader...</p> // Mostra uma mensagem enquanto o Uppy não é inicializado
        )}
      </div>
    </div>
  );
}
