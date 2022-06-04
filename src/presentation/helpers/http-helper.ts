import { HttpResponse } from '../../presentation/protocols'
import { ServerError } from '../../presentation/errors'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    data: error
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    data: new ServerError()
  }
}

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    data
  }
}
