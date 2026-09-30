import { SnailPayRequest, SnailPayResponse } from "../models/SnailPay.DTO";

const isValidDate = (value: Date | string | undefined): boolean => {
  if (!value) return false;

  if (value instanceof Date) {
    return !Number.isNaN(value.getTime());
  }

  return /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(value.trim());
};

export const validateSnailPayRequest = (payload: SnailPayRequest): void => {
  if (!payload) {
    throw new Error("El cuerpo de la petición es obligatorio.");
  }

  const cardNumber = String(payload.cardNumber ?? "").replace(/\s+/g, "");

  if (cardNumber.length < 12) {
    throw new Error("El número de tarjeta no es válido.");
  }

  if (!payload.name || payload.name.trim().length < 2) {
    throw new Error("El nombre del titular es obligatorio.");
  }

  if (typeof payload.amount !== "number" || payload.amount <= 0) {
    throw new Error("El monto debe ser mayor a cero.");
  }

  const cvv = Number(payload.cvv);
  if (!Number.isInteger(cvv) || cvv < 100 || cvv > 9999) {
    throw new Error("El CVV no es válido.");
  }

  if (!isValidDate(payload.expireDate)) {
    throw new Error("La fecha de vencimiento debe tener formato MM/AA.");
  }
};

export const processSnailPayCharge = (
  payload: SnailPayRequest,
): SnailPayResponse => {
  validateSnailPayRequest(payload);

  const now = new Date();
  const isMaintenanceWindow = now.getHours() >= 0 && now.getHours() < 1;

  if (isMaintenanceWindow) {
    return {
      id: 0,
      status: "maintenance",
      status_detail: "El sistema no está disponible",
      transaction_amount: 0,
      date_created: now,
      authorization_code: "",
      reference: "",
      payer_id: "",
      payer_email: "",
      cvv: 0,
      cardNumber: 0,
    };
  }

  return {
    id: Date.now(),
    status: "approved",
    status_detail: "accredited",
    transaction_amount: payload.amount,
    date_created: now,
    authorization_code: `AUTH-${Date.now()}`,
    reference: `REF-${Date.now()}`,
    payer_id: "payer-001",
    payer_email: "payer@example.com",
    cvv: payload.cvv,
    cardNumber: payload.cardNumber,
  };
};
