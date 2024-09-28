export function DisplayCounts() {
  return (
    <div className="w-full border-b border-black/50 pb-2">
      <div className="flex items-center gap-6 px-4 text-sm">
        <div>
          <span className="font-bold">Uploads: </span>
          <span className="font-bold text-success">250 GiB </span>
        </div>
        <div>
          <span className="font-bold">Downloads: </span>
          <span className="font-bold text-success">250 GiB </span>
        </div>
        <div>
          <span className="font-bold">Arquivos: </span>
          <span className="font-bold text-success">150 </span>
        </div>
        <div>
          <span className="font-bold">Pastas: </span>
          <span className="font-bold text-success">5 </span>
        </div>
      </div>
    </div>
  );
}
