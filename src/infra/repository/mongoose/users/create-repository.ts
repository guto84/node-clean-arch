import { UserEntity } from '../../../../domain/entities'

export class CreateUserRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(body: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    return new Promise((resolve) =>
      resolve({
        id: 1,
        name: 'name',
        email: 'name@email.com',
        password: 'hashed_password',
      }),
    )
  }
}
