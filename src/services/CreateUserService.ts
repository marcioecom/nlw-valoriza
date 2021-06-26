import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository)

    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlredyExists = await usersRepository.findOne({
      email
    })

    if (userAlredyExists) {
      throw new Error('User alredy exists')
    }

    const user = usersRepository.create({
      name,
      email,
      admin,
      password
    })

    await usersRepository.save(user)

    return user;
  }
}

export { CreateUserService }