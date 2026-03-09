import { pool } from "../../db/client"
import { ledgerService } from "../ledger/ledger.service"

class AccessService {

  async requestAccess(userId: string, appApiKey: string, endpoint: string) {

    const appQuery = `
      SELECT * FROM third_party_apps WHERE api_key=$1
    `

    const appResult = await pool.query(appQuery, [appApiKey])

    if (appResult.rows.length === 0) {
      throw new Error("Invalid API key")
    }

    const app = appResult.rows[0]

    const consentQuery = `
      SELECT * FROM consents
      WHERE user_id=$1
      AND app_id=$2
      AND status='GRANTED'
    `

    const consentResult = await pool.query(consentQuery, [
      userId,
      app.id
    ])

    const granted = consentResult.rows.length > 0

    const logQuery = `
      INSERT INTO access_logs (user_id, app_id, endpoint, granted)
      VALUES ($1,$2,$3,$4)
      RETURNING *
    `

    const logResult = await pool.query(logQuery, [
      userId,
      app.id,
      endpoint,
      granted
    ])

    ledgerService.addBlock("DATA_ACCESS", {
      userId,
      appId: app.id,
      endpoint,
      granted
    })

    return {
      granted,
      log: logResult.rows[0]
    }
  }
}

export const accessService = new AccessService()