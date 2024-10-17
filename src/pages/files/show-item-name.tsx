import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from '@nextui-org/react'

export const ShowItemName = ({ description }: { description: string }) => {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button
          variant="ghost"
          className="max-w-[50rem] overflow-hidden text-ellipsis whitespace-nowrap rounded border-none pl-0 text-left hover:bg-content2"
        >
          {description}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[20rem] rounded bg-content2 shadow-lg">
        <div className="px-1 py-2">
          <div className="text-tiny">{description}</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
