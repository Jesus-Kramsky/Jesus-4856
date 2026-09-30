import express, { Request, Response } from "express";
import cors from "cors";
import snailPayRoutes from "./routes/snailPayRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/snailpay", snailPayRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

export default app;
