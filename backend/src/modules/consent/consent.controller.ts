import { Request, Response } from "express";
import { consentService } from "./consent.service";

export const grantConsent = async (req: Request, res: Response) => {

  const { userId, appId, scope } = req.body;

  const consent = await consentService.grantConsent(userId, appId, scope);

  res.json(consent);
};

export const revokeConsent = async (req: Request, res: Response) => {

  const { consentId } = req.body;

  const consent = await consentService.revokeConsent(consentId);

  res.json(consent);
};

export const getUserConsents = async (req: Request, res: Response) => {

  const userId = req.params.userId as string;

  const consents = await consentService.getUserConsents(userId);

  res.json(consents);
};