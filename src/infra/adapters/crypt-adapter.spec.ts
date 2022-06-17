import bcrypt from 'bcrypt'
import { CryptAdapter } from './crypt-adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('encrypt_password'))
  },
}))

const salt = 12
const makeSut = (): CryptAdapter => {
  return new CryptAdapter(salt)
}

describe('crypt adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const encryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('password')
    expect(encryptSpy).toHaveBeenCalledWith('password', 12)
  })

  test('should return a encrypt on success', async () => {
    const sut = makeSut()
    const encrypt = await sut.encrypt('password')
    expect(encrypt).toBe('encrypt_password')
  })

  test('should throw if CryptAdapter throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('password')
    await expect(promise).rejects.toThrow()
  })
})
