import Controller from "../../presentation/http/protocols/controller";

export type methodType = 'post' | 'get' | 'put' | 'delete'

export default abstract class Route {
    constructor(
        readonly method: methodType,
        readonly url: string,
        readonly handler: Controller
    ) {}
}
