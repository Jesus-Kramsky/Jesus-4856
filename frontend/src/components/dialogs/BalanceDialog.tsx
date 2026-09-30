import { Button, Input, Label } from "@heroui/react";

export default function BalanceDialog() {
  const closeModal = () => {
    const dialog = document.querySelector("dialog");
    if (dialog) {
      dialog.close();
    }
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold">Cargar saldo</h2>
        <Button className="bg-red-500" onClick={closeModal}>
          Cerrar
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-white">Monto:</Label>
        <div className="flex flex-row gap-2">
          <Button variant="secondary" className="w-full">
            $100
          </Button>
          <Button variant="secondary" className="w-full">
            $200
          </Button>
          <Button variant="secondary" className="w-full">
            $500
          </Button>
        </div>
        <Input type="number" placeholder="Ingrese el monto a cargar" />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-white">Número de tarjeta:</Label>
        <Input type="text" placeholder="Ingrese el número de tarjeta" />
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col">
          <Label className="text-white">Fecha de vencimiento:</Label>
          <Input type="text" placeholder="MM/AA" />
        </div>
        <div className="flex flex-col">
          <Label className="text-white">Código de seguridad:</Label>
          <Input type="text" placeholder="CVV" />
        </div>
      </div>
      <div className="flex flex-col">
        <Label className="text-white">Nombre en la tarjeta:</Label>
        <Input type="text" placeholder="Ingrese el nombre en la tarjeta" />
      </div>
      <Button className="bg-green-500 w-full">Cargar saldo</Button>
    </div>
  );
}
