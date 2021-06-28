import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import { classToPlain } from 'class-transformer'

class ListUsersService {
  async execute() {
    const userRepository = getCustomRepository(UsersRepository)

    const users = await userRepository.find({
      where: {
        admin: false
      }
    })

    return classToPlain(users)
  }
}

export { ListUsersService }
