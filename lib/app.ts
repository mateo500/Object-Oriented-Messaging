import express, { Application, IRouter, json } from "express";
import { IApp, IAppConfig } from "./app.interface";

//express middlewares
export const bodyParser = json;

export default class App implements IApp {
  public app: Application = express();

  public port: number;

  constructor({ port, _middlewares, controllers, services }: IAppConfig) {
    this.port = port;

    //middlewares
    this.middlewares(_middlewares);
    this.routes(controllers);
    this.initServices(services);
  }

  private middlewares(middleWares: any[]): void {
    middleWares.forEach((middleWare: any) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: any[]): void {
    controllers.forEach((controller: any) => {
      this.app.use("/", new controller().router);
    });
  }

  private initServices(services: any[]) {
    services.forEach((service) => new service());
  }

  public listen(): void {
    this.app.listen(this.port, () =>
      console.log(`server connected on port: ${this.port}`)
    );
  }
}
