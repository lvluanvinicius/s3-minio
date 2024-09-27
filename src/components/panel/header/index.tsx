import { getAppConfig } from "@/services/queries/app/app-config";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { HeaderSkeleton } from "./skeleton";

export function Header() {
  const { data: config } = useQuery({
    queryKey: ["app-header-settings"],
    queryFn: getAppConfig,
  });

  if (!config) {
    return <HeaderSkeleton />;
  }

  return (
    <header className="flex h-[4rem] w-full items-center justify-center bg-primary text-white">
      <div className="flex h-full w-[80%] items-center justify-between">
        <Link href={"/home"} className="flex h-full w-8 items-center gap-2">
          <Image
            src={`${config.data.s3_api_url}/${config.data.app_bucket}/${config.data.app_logo}`}
            alt={config.data.app_name}
            width={1000}
            height={1000}
          />
          <span className="text-xl font-medium tracking-wide">
            {config.data.app_name}
          </span>
        </Link>

        <div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                as={"button"}
                avatarProps={{
                  isBordered: true,
                  src: "https://avatars.githubusercontent.com/u/44438249?v=4",
                  size: "sm",
                  color: "secondary",
                }}
                description="@luan"
                name="Luan Santos"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="shadow">
              <DropdownItem key={"profile"} href="/profile">
                Perfil
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}