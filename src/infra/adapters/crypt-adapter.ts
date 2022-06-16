import { Encrypter } from '../../data/protocols'
import bcrypt from 'bcrypt'

export class CryptAdapter implements Encrypter {
  constructor(private readonly salt: number) {}
  async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt)
  }
}
