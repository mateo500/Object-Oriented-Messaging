import { Request, Response, Router, IRouter } from "express";
import GlobalMessagingPool from "./GlobalMessagingPool";
import GlobalEmiter from "./GlobalEmiter";

export interface IUserControllerBase {
  router: IRouter;
}

enum paths {
  testing = "/testing",
  logger = "/logger",
  login = "/login",
}

let registerResponse: string;
const receiveMessage = (args: any) => {
  registerResponse = GlobalMessagingPool.getPool()[args];
};

GlobalEmiter.on("USER_REGISTER_RESPONSE", receiveMessage);

let loginResponse: string;
const receiveMessageLogin = (args: any) => {
  registerResponse = GlobalMessagingPool.getPool()[args];
};

GlobalEmiter.on("USER_LOGIN_RESPONSE", receiveMessageLogin);

export class Controller implements IUserControllerBase {
  public router: IRouter = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(paths.testing, this.registerUser);
    this.router.get(paths.logger, this.getLogger);
    this.router.post(paths.login, this.loginUser);
  }

  private registerUser(req: Request, res: Response): any {
    GlobalMessagingPool.insertMessageInPool(req.body.context, {
      payload: req.body.payload,
      from: "controller.ts",
      to: "testService.ts",
    });

    res.send(registerResponse);
  }

  private loginUser(req: Request, res: Response): any {
    GlobalMessagingPool.insertMessageInPool(req.body.context, {
      payload: req.body.payload,
      from: "controller.ts",
      to: "testService.ts",
    });

    res.send(loginResponse);
  }

  private getLogger(req: Request, res: Response): Response {
    return res.send(GlobalMessagingPool.getLoggedMessages());
  }
}
