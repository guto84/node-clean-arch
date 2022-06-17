import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
} from '../../protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers'
import { CreateUser } from '../../../domain/usecases'

export class CreateUserController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly creteUser: CreateUser,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password, passwordConfirmation } = httpRequest.body
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const response = await this.creteUser.handle({ name, email, password })

      return ok(response)
    } catch (error) {
      return serverError()
    }
  }
}
