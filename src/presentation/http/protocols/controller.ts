import HttpResponse from "./http-response";

export default interface Controller<T = any, K = any> {
  handle(request: T): Promise<HttpResponse<K>>
}
