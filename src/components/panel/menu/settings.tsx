import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export function Settings() {
  return (
    <Dropdown>
      <DropdownTrigger className="flex h-full cursor-pointer items-center gap-1 border-b-2 border-transparent px-6 text-sm hover:border-primary/30 hover:opacity-50">
        Configurações ▾
      </DropdownTrigger>
      <DropdownMenu variant="shadow">
        <DropdownItem key="list" href="/settings/app">
          Aplicativo
        </DropdownItem>
        <DropdownItem key="new" href="/settings/s3-storage">
          S3 Storage
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}