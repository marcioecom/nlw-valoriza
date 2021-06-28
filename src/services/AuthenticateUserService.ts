import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findOne({
      email
    })

    if (!user) {
      throw new Error("Email/Password incorrect")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect")
    }

    const token = sign({
      email: user.email
    }, "f6cbaee37d7b37ba8406437791b1dc74", {
      subject: user.id,
      expiresIn: "1d"
    })

    return token
  }
}

export { AuthenticateUserService }
