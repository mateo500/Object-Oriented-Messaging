import { Request, Response, Router, IRouter } from "express";
import GlobalMessagingPool from "./GlobalMessagingPool";
import GlobalEmiter from "./GlobalEmiter";

export interface IUserControllerBase {
  router: IRouter;
}

enum paths {
  testing = "/testing",
  logger = "/logger",
}

let registerResponse: string;
const receiveMessage = (args: any) => {
  registerResponse = GlobalMessagingPool.getPool()[args];
};

GlobalEmiter.on("USER_REGISTER_RESPONSE", receiveMessage);

export class Controller implements IUserControllerBase {
  public router: IRouter = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(paths.testing, this.registerUser);
    this.router.get(paths.logger, this.getLogger);
  }

  private registerUser(req: Request, res: Response): any {
    GlobalMessagingPool.insertMessageInPool(req.body.context, {
      payload: req.body.payload,
      from: "controller.ts",
      to: "testService.ts",
    });

    res.send(registerResponse);
  }

  private getLogger(req: Request, res: Response): Response {
    return res.send(GlobalMessagingPool.getLoggedMessages());
  }
}
