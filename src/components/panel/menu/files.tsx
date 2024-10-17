import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import Link from 'next/link'

export function Files() {
  return (
    <Dropdown>
      <DropdownTrigger className="flex h-full cursor-pointer items-center gap-1 border-b-2 border-transparent px-6 text-sm hover:border-primary/30 hover:opacity-50">
        Arquivos ▾
      </DropdownTrigger>
      <DropdownMenu variant="shadow">
        <DropdownItem as={Link} key="list" href="/files">
          Arquivo
        </DropdownItem>
        <DropdownItem as={Link} key="new" href="/files/create">
          + Novo Arquivo
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
