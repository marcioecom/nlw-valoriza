import { Request, Response } from "express"
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService"

class ListUserSendComplimentsController {
  async handle(req: Request, res: Response) {
    const { user_id } = req

    const listUserSendComplimentsService = new ListUserSendComplimentsService()

    const compliments = await listUserSendComplimentsService.execute(user_id)

    return res.json(compliments)
  }
}

export { ListUserSendComplimentsController }
