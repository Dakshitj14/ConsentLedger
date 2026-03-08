import { pool } from "../../db/client";
import { ledgerService } from "../ledger/ledger.service";

class ConsentService {

  async grantConsent(userId: string, appId: string, scope: string) {

    const query = `
      INSERT INTO consents (user_id, app_id, data_scope, status)
      VALUES ($1,$2,$3,'GRANTED')
      RETURNING *
    `;

    const result = await pool.query(query, [userId, appId, scope]);
    const consent = result.rows[0];

    ledgerService.addBlock("CONSENT_GRANTED", {
      consentId: consent.id,
      userId,
      appId,
      scope
    });

    return consent;
  }

  async revokeConsent(consentId: string) {

    const query = `
      UPDATE consents
      SET status='REVOKED'
      WHERE id=$1
      RETURNING *
    `;

    const result = await pool.query(query, [consentId]);
    const consent = result.rows[0];

    ledgerService.addBlock("CONSENT_REVOKED", {
      consentId
    });

    return consent;
  }

  async getUserConsents(userId: string) {

    const query = `
      SELECT * FROM consents
      WHERE user_id=$1
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;
  }
}

export const consentService = new ConsentService();