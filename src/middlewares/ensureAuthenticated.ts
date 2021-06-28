import { Request, Response, NextFunction, request } from "express"
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).end()
  }

  const token = authToken.split(' ')[1]


  try {
    const { sub } = verify(token, 'f6cbaee37d7b37ba8406437791b1dc74') as IPayload

    req.user_id = sub

    return next()
  } catch (error) {
    return res.status(401).end()
  }


}
