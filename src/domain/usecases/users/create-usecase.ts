import { UserEntity } from '../../entities'

export interface CreateUser {
  handle(body: Omit<UserEntity, 'id'>): Promise<UserEntity>
}
