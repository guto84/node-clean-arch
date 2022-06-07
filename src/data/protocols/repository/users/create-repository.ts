import { UserEntity } from '../../../../domain/entities'

export type CreateUserRepository = {
  handle(body: Omit<UserEntity, 'id'>): Promise<UserEntity>
}
