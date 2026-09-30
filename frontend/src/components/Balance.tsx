import { Button } from "@heroui/react";

export default function Balance() {
  return (
    <div className="flex flex-1 flex-col border p-4 border-gray-700">
      <p>Saldo actual:</p>
      <h2 className="text-2xl font-bold">
        ${JSON.parse(localStorage.getItem("user_session")!).balance}
      </h2>
      <Button className="bg-green-500">Cargar saldo</Button>
    </div>
  );
}
