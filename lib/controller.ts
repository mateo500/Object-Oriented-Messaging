import { Request, Response, Router, IRouter } from 'express';
import GlobalMessagingPool from './GlobalMessagingPool';

export interface IUserControllerBase {
  router: IRouter;
}

enum paths {
  testing = '/testing',
  logger = '/logger',
}

export class Controller implements IUserControllerBase {
  public router: IRouter = Router();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(paths.testing, this.sendMessage);
    this.router.get(paths.logger, this.getLogger);
  }

  private sendMessage(req: Request, res: Response): Response {
    GlobalMessagingPool.insertMessageInPool(req.body.context, {
      payload: req.body.payload,
      from: 'controller.ts',
      to: 'testService.ts',
    });
    return res.send({
      type: 'Success',
      messageCreated: GlobalMessagingPool.getLoggedMessages().slice(-1),
    });
  }

  private getLogger(req: Request, res: Response): Response {
    return res.send(GlobalMessagingPool.getLoggedMessages());
  }
}
