import { UserEntity } from '../../entities'

export type CreateUser = {
  handle(body: Omit<UserEntity, 'id'>): Promise<UserEntity>
}
