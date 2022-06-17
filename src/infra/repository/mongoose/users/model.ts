import { Schema, model } from 'mongoose'
import { UserEntity } from '../../../../domain/entities'

const userSchema = new Schema<UserEntity>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

export const UserModel = model<UserEntity>('User', userSchema)
