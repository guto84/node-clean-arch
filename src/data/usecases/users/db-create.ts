import { UserEntity } from '../../../domain/entities'
import { CreateUser } from '../../../domain/usecases'
import { CreateUserRepository, Encrypter } from '../../protocols'

export class DbCreateUser implements CreateUser {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly createUserRepository: CreateUserRepository
  ) {}

  async handle(body: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const hashedPassword = await this.encrypter.encrypt(body.password)
    return await this.createUserRepository.handle(
      Object.assign({}, body, { password: hashedPassword })
    )
  }
}
