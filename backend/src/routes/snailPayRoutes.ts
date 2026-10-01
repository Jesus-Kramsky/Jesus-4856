import { Router, Request, Response } from "express";
import { SnailPayRequest, SnailPayResponse } from "../models/SnailPay.DTO";
import { processSnailPayCharge } from "../services/snailPayService";

const router = Router();

router.post("/", (req: Request<{}, {}, SnailPayRequest>, res: Response) => {
  try {
    const payload: SnailPayRequest = req.body;
    const result = processSnailPayCharge(payload);

    return res.status(201).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error al procesar el cobro.";

    const fallbackResponse: SnailPayResponse = {
      id: 0,
      status: "rejected",
      status_detail: message,
      transaction_amount: 0,
      date_created: new Date(),
      authorization_code: "",
      reference: "",
      payer_id: "",
      payer_email: "",
      cvv: 0,
      cardNumber: 0,
    };

    return res.status(400).json({
      ok: false,
      data: fallbackResponse,
    });
  }
});

export default router;
