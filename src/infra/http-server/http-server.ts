import Route from "./route";

export interface HttpServer {
    on(route: Route): void;
    listen(port: number): void;
}
