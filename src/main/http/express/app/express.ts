import { HttpServer } from "../../../../infra/http-server/http-server";

import express, { Request, Response } from "express"
import Route from "../../../../infra/http-server/route";

export default class ExpressAdapter implements HttpServer {
    private readonly app: express.Express;
    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    on(route: Route): void {
        this.app[route.method](route.url, async (req: Request, res: Response) => {
            const output = await route.handler.handle({
                ...req.body,
                ...req.params,
            });

            return res.status(output.statusCode).json(output.body);
        });
    }

    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`server is running at port ${port}`)
        })
    }
}
