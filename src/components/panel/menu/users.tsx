import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export function Users() {
  return (
    <Dropdown>
      <DropdownTrigger className="flex h-full cursor-pointer items-center gap-1 border-b-2 border-transparent px-6 text-sm hover:border-primary/30 hover:opacity-50">
        Usuários ▾
      </DropdownTrigger>
      <DropdownMenu variant="shadow">
        <DropdownItem key="list" href="/users">
          Usuários
        </DropdownItem>
        <DropdownItem key="new" href="/users/create">
          + Novo Usuário
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
