import { Router } from "express";
import ledgerRoutes from "../modules/ledger/ledger.routes";
import consentRoutes from "../modules/consent/consent.routes";
import accessRoutes from "../modules/access/access.routes"
const router = Router();
router.use("/consent", consentRoutes);
router.use("/ledger", ledgerRoutes);
router.use("/access", accessRoutes)
export default router;