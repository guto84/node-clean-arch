import { isValidObjectId } from 'mongoose'
import { CreateUserRepository } from './create-repository'

describe('Create user repository', () => {
  const makeSut = () => {
    return new CreateUserRepository()
  }

  test('should return an user on success', async () => {
    const sut = makeSut()
    const response = await sut.handle({
      name: 'name',
      email: 'name@email.com',
      password: 'hashed_password',
    })
    expect(response).toBeTruthy()
    expect(isValidObjectId(response.id)).toBeTruthy()
    expect(response.name).toBe('name')
    expect(response.email).toBe('name@email.com')
    expect(response.password).toBe('hashed_password')
  })
})
