import { UserEntity } from '../../../../domain/entities'

export type CreateUserRepositoryProtocol = {
  handle(body: Omit<UserEntity, 'id'>): Promise<UserEntity>
}
