import { Router } from "express";
import ledgerRoutes from "../modules/ledger/ledger.routes";
import consentRoutes from "../modules/consent/consent.routes";

const router = Router();
router.use("/consent", consentRoutes);
router.use("/ledger", ledgerRoutes);

export default router;