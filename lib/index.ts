import App, { bodyParser } from "./app";
import { IAppConfig } from "./app.interface";
import { Controller } from "./testController";
import { TestService } from "./testService";

//app config
const appConfig: IAppConfig = {
  port: 5000,
  _middlewares: [bodyParser()],
  controllers: [new Controller()],
};

//Run App
new App(appConfig).listen();
new TestService();
