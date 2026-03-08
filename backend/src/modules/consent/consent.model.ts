export interface Consent {
  id: string;
  user_id: string;
  app_id: string;
  data_scope: string;
  status: "GRANTED" | "REVOKED";
  version: number;
  created_at: string;
  expires_at?: string;
}