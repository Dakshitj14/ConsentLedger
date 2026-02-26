import { Router } from "express";
import ledgerRoutes from "../modules/ledger/ledger.routes";

const router = Router();

router.use("/ledger", ledgerRoutes);

export default router;