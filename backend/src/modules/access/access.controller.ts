import { Request, Response } from "express"
import { accessService } from "./access.service"

export const requestAccess = async (req: Request, res: Response) => {

  try {

    const { userId, endpoint } = req.body
    const apiKey = req.headers["x-api-key"] as string

    const result = await accessService.requestAccess(
      userId,
      apiKey,
      endpoint
    )

    res.json(result)

  } catch (error: any) {

    res.status(400).json({
      error: error.message
    })

  }
}