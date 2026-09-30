import { Button } from "@heroui/react";
import { useRef } from "react";
import BalanceDialog from "./dialogs/BalanceDialog";

export default function Balance() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openModal = () => dialogRef.current?.showModal();

  return (
    <div className="flex flex-1 flex-col border p-4 border-gray-700">
      <p>Saldo actual:</p>
      <h2 className="text-2xl font-bold">
        ${JSON.parse(localStorage.getItem("user_session")!).balance}
      </h2>
      <Button className="bg-green-500" onClick={openModal}>
        Cargar saldo
      </Button>
      <div className="flex justify-center items-center gap-4">
        <dialog
          ref={dialogRef}
          className="self-center justify-self-center bg-[#18181b] text-white p-6 rounded-xl border border-gray-700 backdrop:bg-black/70 max-w-md w-full shadow-2xl"
        >
          <BalanceDialog />
        </dialog>
      </div>
    </div>
  );
}
