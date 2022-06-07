export type Encrypter = {
  encrypt(password: string): Promise<string>
}
