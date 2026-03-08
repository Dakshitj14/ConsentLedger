import { Router } from "express";
import {
  grantConsent,
  revokeConsent,
  getUserConsents
} from "./consent.controller";

const router = Router();

router.post("/grant", grantConsent);
router.post("/revoke", revokeConsent);
router.get("/user/:userId", getUserConsents);

export default router;