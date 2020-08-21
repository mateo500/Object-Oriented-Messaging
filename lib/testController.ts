import { Request, Response, Router, IRouter } from "express";
import GlobalMessagingPool from "./GlobalMessagingPool";
import GlobalEmiter from "./GlobalEmiter";

export interface IUserControllerBase {
  router: IRouter;
}

enum paths {
  testing = "/register",
  logger = "/logger",
  login = "/login",
}

let registerResponse: object;
const receiveMessage = (args: string) => {
  registerResponse = GlobalMessagingPool.getPool()[args];
};

GlobalEmiter.on("USER_REGISTER_RESPONSE", receiveMessage);

let loginResponse: object;
const receiveMessageLogin = (args: string) => {
  loginResponse = GlobalMessagingPool.getPool()[args];
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

  private registerUser(req: Request, res: Response) {
    if (req.body.context !== "USER_REGISTER") {
      return res.send("wrong route");
    } else {
      GlobalMessagingPool.insertMessageInPool(req.body.context, {
        payload: req.body.payload,
        from: "controller.ts",
        to: "testService.ts",
      });

      res.send(registerResponse);
    }
  }

  private loginUser(req: Request, res: Response) {
    if (req.body.context !== "USER_LOGIN") {
      return res.send("Wrong Route");
    } else {
      GlobalMessagingPool.insertMessageInPool(req.body.context, {
        payload: req.body.payload,
        from: "controller.ts",
        to: "testService.ts",
      });

      return res.send(loginResponse);
    }
  }

  private getLogger(req: Request, res: Response): Response {
    return res.send(GlobalMessagingPool.getLoggedMessages());
  }
}
