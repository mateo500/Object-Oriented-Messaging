import App, { bodyParser } from "./app";
import { IAppConfig } from "./app.interface";
import { TestController } from "./testController";
import { TestService } from "./testService";

//app config
const appConfig: IAppConfig = {
  port: 5000,
  _middlewares: [bodyParser()],
  controllers: [TestController],
  services: [TestService],
};

//Run App
new App(appConfig).listen();
