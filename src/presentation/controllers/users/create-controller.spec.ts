import { UserEntity } from '../../../domain/entities'
import { CreateUser } from '../../../domain/usecases'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { EmailValidator } from '../../protocols'
import { CreateUserController } from './create-controller'

interface SutTypes {
  sut: CreateUserController
  emailValidatorStub: EmailValidator
  createUserStub: CreateUser
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeCreateUser = (): CreateUser => {
  class CreateUserStub implements CreateUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async handle(body: Omit<UserEntity, 'id'>): Promise<UserEntity> {
      const fakeData = {
        id: 1,
        name: 'name',
        email: 'name@email.com',
        password: 'password',
      }
      return new Promise((resolve) => resolve(fakeData))
    }
  }
  return new CreateUserStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const createUserStub = makeCreateUser()
  const sut = new CreateUserController(emailValidatorStub, createUserStub)
  return {
    sut,
    emailValidatorStub,
    createUserStub,
  }
}

describe('user create controller', () => {
  test('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'name@email.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.data).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'name',
        password: 'password',
        passwordConfirmation: 'password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.data).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'name@email.com',
        passwordConfirmation: 'password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.data).toEqual(new MissingParamError('password'))
  })

  test('should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'name@email.com',
        password: 'password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.data).toEqual(
      new MissingParamError('passwordConfirmation'),
    )
  })

  test('should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'name@email.com',
        password: 'password',
        passwordConfirmation: 'invalid',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.data).toEqual(
      new InvalidParamError('passwordConfirmation'),
    )
  })

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'name',
        email: 'invalid@email.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.data).toEqual(new InvalidParamError('email'))
  })

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'name',
        email: 'nome@email.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('nome@email.com')
  })

  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'name',
        email: 'name@email.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.data).toEqual(new ServerError())
  })

  test('should return 500 if CreateUser throws', async () => {
    const { sut, createUserStub } = makeSut()
    jest.spyOn(createUserStub, 'handle').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        name: 'name',
        email: 'name@email.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.data).toEqual(new ServerError())
  })

  test('should call CreateUser with correct values', async () => {
    const { sut, createUserStub } = makeSut()
    const createSpy = jest.spyOn(createUserStub, 'handle')
    const httpRequest = {
      body: {
        name: 'name',
        email: 'nome@email.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    }
    await sut.handle(httpRequest)
    expect(createSpy).toHaveBeenCalledWith({
      name: 'name',
      email: 'nome@email.com',
      password: 'password',
    })
  })

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'name@email.com',
        password: 'password',
        passwordConfirmation: 'password',
      },
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.data).toEqual({
      id: 1,
      name: 'name',
      email: 'name@email.com',
      password: 'password',
    })
  })
})
