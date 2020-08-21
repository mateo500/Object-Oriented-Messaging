import GlobalMessagingPool from "./GlobalMessagingPool";
import GlobalEmitter from "./GlobalEmiter";

export class TestService {
  public messages: any;

  constructor() {
    this.messages = GlobalMessagingPool.getPool();
    GlobalEmitter.on("USER_REGISTER", (args) => {
      this.registerUser(args);
    });
    GlobalEmitter.on("USER_LOGIN", (args) => {
      this.loginUser(args);
    });
  }

  registerUser(args: any) {
    GlobalMessagingPool.insertMessageInPool("USER_REGISTER_RESPONSE", {
      payload: `user  registered: ${JSON.stringify(
        this.messages[args][1].payload
      )}`,
      from: "TestService.ts",
      to: "Controller.ts",
    });
  }

  loginUser(args: any) {
    GlobalMessagingPool.insertMessageInPool("USER_LOGIN_RESPONSE", {
      payload: `user  logged in: ${JSON.stringify(
        this.messages[args][1].payload
      )}`,
      from: "TestService.ts",
      to: "Controller.ts",
    });
  }
}
