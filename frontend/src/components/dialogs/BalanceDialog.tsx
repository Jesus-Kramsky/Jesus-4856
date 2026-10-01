import { Button, Input, Label } from "@heroui/react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function BalanceDialog() {
  const initialFormData = {
    amount: "",
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    cardHolderName: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (
    field: keyof typeof initialFormData,
    value: string,
  ) => {
    switch (field) {
      case "amount":
        return Number(value) > 0 ? "" : "Ingrese un monto válido.";
      case "cardNumber":
        return value.trim().length >= 12
          ? ""
          : "Ingrese un número de tarjeta válido.";
      case "expirationDate":
        return /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(value.trim())
          ? ""
          : "Ingrese una fecha de vencimiento válida (MM/AA).";
      case "securityCode":
        return /^[0-9]{3,4}$/.test(value.trim())
          ? ""
          : "Ingrese un código de seguridad válido.";
      case "cardHolderName":
        return value.trim().length > 0 ? "" : "Ingrese el nombre del titular.";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateRequiredFields = () => {
    const nextErrors: Record<string, string> = {};

    (
      Object.keys(initialFormData) as Array<keyof typeof initialFormData>
    ).forEach((field) => {
      const message = validateField(field, formData[field]);
      if (message) {
        nextErrors[field] = message;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const closeModal = () => {
    const dialog = document.querySelector("dialog");
    if (dialog) {
      dialog.close();
    }
  };

  const handleLoadBalance = async () => {
    if (!validateRequiredFields()) {
      return;
    }

    const payload = {
      cardNumber: Number(formData.cardNumber.replace(/\s+/g, "")),
      expireDate: formData.expirationDate,
      cvv: Number(formData.securityCode),
      name: formData.cardHolderName,
      amount: Number(formData.amount),
    };

    try {
      const response = await fetch("http://localhost:3000/api/snailpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo procesar el cobro.");
      }

      const storedUser = localStorage.getItem("user_session");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const currentBalance = parsedUser.balance || 0;
        const newBalance = currentBalance + Number(formData.amount);
        parsedUser.balance = newBalance;
        parsedUser.cvv = formData.securityCode;
        parsedUser.cardNumber = formData.cardNumber;
        localStorage.setItem("user_session", JSON.stringify(parsedUser));
      }

      Swal.fire({
        target: document.querySelector("dialog") ?? document.body,
        icon: "success",
        title: "Recarga aprobada",
        text: `Se abonaron $${formData.amount} a tu saldo.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        target: document.querySelector("dialog") ?? document.body,
        icon: "error",
        title: "Cobro rechazado",
        text:
          error instanceof Error
            ? error.message
            : "No se pudo completar la recarga.",
      });
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
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setFormData((prev) => ({ ...prev, amount: "100" }));
              setErrors((prev) => ({ ...prev, amount: "" }));
            }}
          >
            $100
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setFormData((prev) => ({ ...prev, amount: "200" }));
              setErrors((prev) => ({ ...prev, amount: "" }));
            }}
          >
            $200
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setFormData((prev) => ({ ...prev, amount: "500" }));
              setErrors((prev) => ({ ...prev, amount: "" }));
            }}
          >
            $500
          </Button>
        </div>
        <Input
          type="number"
          placeholder="Ingrese el monto a cargar"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          aria-invalid={Boolean(errors.amount)}
        />
        {errors.amount && (
          <p className="text-red-500 text-xs">{errors.amount}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-white">Número de tarjeta:</Label>
        <Input
          type="text"
          placeholder="Ingrese el número de tarjeta"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          aria-invalid={Boolean(errors.cardNumber)}
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-xs">{errors.cardNumber}</p>
        )}
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-col w-full">
          <Label className="text-white">Fecha de vencimiento:</Label>
          <Input
            type="text"
            placeholder="MM/AA"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            aria-invalid={Boolean(errors.expirationDate)}
          />
          {errors.expirationDate && (
            <p className="text-red-500 text-xs">{errors.expirationDate}</p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <Label className="text-white">Código de seguridad:</Label>
          <Input
            type="text"
            placeholder="CVV"
            name="securityCode"
            value={formData.securityCode}
            onChange={handleChange}
            aria-invalid={Boolean(errors.securityCode)}
          />
          {errors.securityCode && (
            <p className="text-red-500 text-xs">{errors.securityCode}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <Label className="text-white">Nombre en la tarjeta:</Label>
        <Input
          type="text"
          placeholder="Ingrese el nombre en la tarjeta"
          name="cardHolderName"
          value={formData.cardHolderName}
          onChange={handleChange}
          aria-invalid={Boolean(errors.cardHolderName)}
        />
        {errors.cardHolderName && (
          <p className="text-red-500 text-xs">{errors.cardHolderName}</p>
        )}
      </div>
      <Button className="bg-green-500 w-full" onClick={handleLoadBalance}>
        Cargar saldo
      </Button>
    </div>
  );
}
