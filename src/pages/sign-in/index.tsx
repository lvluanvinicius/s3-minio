import { Button, Input } from "@nextui-org/react";
import Image from "next/image";

interface AppConfig {
  config: {
    app_bucket: string;
    app_name: string;
    app_logo: string;
    s3_api_url: string;
  };
}

export function SignIn({ config }: AppConfig) {
  return (
    <div className="fixed left-[50%] top-[50%] flex h-[28rem] w-[30rem] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-xl bg-primary text-white shadow-md shadow-primary">
      <div className="flex h-[6rem] w-full flex-col items-center justify-center border-b border-white/50">
        <div className="w-[3.5rem]">
          <Image
            src={`/uploads/${config.app_logo}`}
            alt={config.app_name}
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div className="w-full py-3 text-center">
        <h2 className="uppercase">Faça login para continuar</h2>
      </div>

      <div className="flex flex-col gap-4 px-12">
        <Input
          variant="bordered"
          color="secondary"
          label="Usuário"
          labelPlacement="inside"
          fullWidth
          size="sm"
          type="text"
          radius="md"
          placeholder="Entre com seu usuário"
        />
        <Input
          variant="bordered"
          color="secondary"
          label="Senha"
          labelPlacement="inside"
          fullWidth
          size="sm"
          type="password"
          radius="md"
          placeholder="Entre com sua senha"
        />

        <Button variant="ghost" color="secondary" className="text-white">
          Entrar
        </Button>
      </div>

      <div className="flex w-full items-center justify-between px-12">
        <div />
        <a href="mailto:lvluansantos@gmail.com" className="opacity-35">
          S3 Api Content
        </a>
      </div>
    </div>
  );
}
