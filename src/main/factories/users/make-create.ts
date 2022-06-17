import { CreateUserData } from '../../../data/usecases'
import { CryptAdapter } from '../../../infra/adapters/crypt-adapter'
import { CreateUserRepository } from '../../../infra/repository/mongoose/users'
import { CreateUserController } from '../../../presentation/controllers'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

export const makeCreateUserController = (): CreateUserController => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const cryptAdapter = new CryptAdapter(salt)
  const createUserRepository = new CreateUserRepository()
  const createUserData = new CreateUserData(cryptAdapter, createUserRepository)
  return new CreateUserController(emailValidatorAdapter, createUserData)
}
