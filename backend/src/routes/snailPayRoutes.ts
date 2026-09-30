import { Router, Request, Response } from "express";
import { SnailPayRequest } from "../models/SnailPay.DTO";
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

    return res.status(400).json({
      ok: false,
      message,
    });
  }
});

export default router;
