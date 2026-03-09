export interface AccessLog {
  id: string
  user_id: string
  app_id: string
  endpoint: string
  granted: boolean
  created_at: string
}