export function Logs() {
  return (
    <div className="w-full">
      <div>
        <h2 className="text-[1rem] font-bold">Últimos acessos</h2>
        <ul className="mt-2 flex flex-col gap-2 pl-4 text-sm">
          <li className="cursor-pointer hover:underline">
            <strong>@luan</strong> efetuou login há cerca de 22 minutos...
          </li>
          <li className="cursor-pointer hover:underline">
            <strong>@fulano</strong> efetuou login há cerca de 40 minutos...
          </li>
          <li className="cursor-pointer hover:underline">
            <strong>@fulano</strong> efetuou login há cerca de 1 dia...
          </li>
          <li className="cursor-pointer hover:underline">
            <strong>@luan</strong> efetuou login há cerca de 10 dias...
          </li>
          <li className="cursor-pointer hover:underline">
            <strong>@luan</strong> efetuou login há cerca de 10 dias...
          </li>
          <li className="cursor-pointer hover:underline">
            <strong>@luan</strong> efetuou login há cerca de 10 dias...
          </li>
        </ul>
      </div>
    </div>
  )
}
