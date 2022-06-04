import { HttpRequest, HttpResponse } from '../../presentation/protocols'

export type Controller = {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
