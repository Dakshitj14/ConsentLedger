import { Router } from "express";
import { ledgerService } from "./ledger.service";

const router = Router();

router.get("/blocks", (_, res) => {
  res.json(ledgerService.getChain());
});

router.post("/add", (req, res) => {
  const { type, payload } = req.body;
  const block = ledgerService.addBlock(type, payload);
  res.json(block);
});

router.get("/verify", (_, res) => {
  res.json(ledgerService.verifyChain());
});

export default router;