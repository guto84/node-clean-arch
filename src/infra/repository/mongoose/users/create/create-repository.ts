import { CreateUserRepositoryProtocol } from '../../../../../data/protocols'
import { UserEntity } from '../../../../../domain/entities'
import { UserModel } from '../model'

export class CreateUserRepository implements CreateUserRepositoryProtocol {
  async handle(body: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const data = new UserModel(body)
    const response = await data.save()
    return response
  }
}
