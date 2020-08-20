import express, { Application, IRouter, json } from 'express';
import { IApp, IAppConfig } from './app.interface';

//express middlewares
export const bodyParser = json;

export default class App implements IApp {
    public app: Application = express();

    public port: number;

    constructor({ port, _middlewares, controllers }: IAppConfig) {
        this.port = port;

        //middlewares
        this.middlewares(_middlewares);
        this.routes(controllers);
    }

    private middlewares(middleWares: any): void {
        middleWares.forEach((middleWare: any) => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: any): void {
        controllers.forEach((controller: { router: IRouter }) => {
            this.app.use('/', controller.router);
        });
    }

    public listen(): void {
        this.app.listen(this.port, () =>
            console.log(`server connected on port: ${this.port}`)
        );
    }
}
