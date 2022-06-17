import { UserEntity } from '../../../domain/entities'
import { Encrypter } from '../../protocols'
import { CreateUserRepositoryProtocol } from '../../protocols'
import { CreateDataUser } from './create-data'

type SutTypes = {
  sut: CreateDataUser
  encrypterStub: Encrypter
  createUserRepositoryStub: CreateUserRepositoryProtocol
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async encrypt(password: string): Promise<string> {
      return new Promise((resolve) => resolve('encryp_password'))
    }
  }
  return new EncrypterStub()
}

const makeCreateUserRepository = (): CreateUserRepositoryProtocol => {
  class CreateUserRepositoryStub implements CreateUserRepositoryProtocol {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle(body: Omit<UserEntity, 'id'>): Promise<UserEntity> {
      return new Promise((resolve) =>
        resolve({
          id: 1,
          name: 'name',
          email: 'name@email.com.br',
          password: 'encryp_password',
        }),
      )
    }
  }
  return new CreateUserRepositoryStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const createUserRepositoryStub = makeCreateUserRepository()
  const sut = new CreateDataUser(encrypterStub, createUserRepositoryStub)
  return {
    sut,
    encrypterStub,
    createUserRepositoryStub,
  }
}

describe('db create user', () => {
  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const body = {
      name: 'name',
      email: 'name@email.com.br',
      password: 'password',
    }
    await sut.handle(body)
    expect(encryptSpy).toHaveBeenCalledWith('password')
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )
    const body = {
      name: 'name',
      email: 'name@email.com.br',
      password: 'encryp_password',
    }
    const promise = sut.handle(body)
    await expect(promise).rejects.toThrow()
  })

  test('should call UserCreateRepository with correct values', async () => {
    const { sut, createUserRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createUserRepositoryStub, 'handle')
    const body = {
      name: 'name',
      email: 'name@email.com.br',
      password: 'encryp_password',
    }
    await sut.handle(body)
    expect(createSpy).toHaveBeenCalledWith(body)
  })

  test('should throw if UserCreateRepository throws', async () => {
    const { sut, createUserRepositoryStub } = makeSut()
    jest
      .spyOn(createUserRepositoryStub, 'handle')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )
    const body = {
      name: 'name',
      email: 'name@email.com.br',
      password: 'encryp_password',
    }
    const promise = sut.handle(body)
    await expect(promise).rejects.toThrow()
  })

  test('should return an account on success', async () => {
    const { sut } = makeSut()
    const body = {
      name: 'name',
      email: 'name@email.com.br',
      password: 'encryp_password',
    }
    const response = await sut.handle(body)
    expect(response).toEqual({
      id: 1,
      name: 'name',
      email: 'name@email.com.br',
      password: 'encryp_password',
    })
  })
})
