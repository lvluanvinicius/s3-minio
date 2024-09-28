import {
  RiArrowLeftDoubleFill,
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
} from "react-icons/ri";

export function Paginate() {
  return (
    <div className="w-full rounded-md bg-content2 px-2 py-2">
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <p>Página 1 de 4</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-content1">
            <RiArrowLeftDoubleFill size={20} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-content1">
            <RiArrowLeftSLine size={20} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-content1">
            <RiArrowRightSLine size={20} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-content1">
            <RiArrowRightDoubleFill size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
