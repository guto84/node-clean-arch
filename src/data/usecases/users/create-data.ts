import { UserEntity } from '../../../domain/entities'
import { CreateUser } from '../../../domain/usecases'
import { CreateUserRepositoryProtocol, Encrypter } from '../../protocols'

export class CreateUserData implements CreateUser {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly createUserRepository: CreateUserRepositoryProtocol,
  ) {}

  async handle(body: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const hashedPassword = await this.encrypter.encrypt(body.password)
    return await this.createUserRepository.handle(
      Object.assign({}, body, { password: hashedPassword }),
    )
  }
}
