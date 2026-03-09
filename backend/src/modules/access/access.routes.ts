import { Router } from "express"
import { requestAccess } from "./access.controller"

const router = Router()

router.post("/request", requestAccess)

export default router