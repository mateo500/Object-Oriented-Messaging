import GlobalMessagingPool from './GlobalMessagingPool';
import GlobalEmitter from './GlobalEmiter';

export class TestService {
  public messages: any;

  constructor() {
    this.messages = GlobalMessagingPool.getPool();
    GlobalEmitter.on('USER_REGISTER', (args) => {
      this.logMessagePayload(args);
    });
    GlobalEmitter.on('USER_LOGIN', (args) => {
      this.logMessagePayload(args);
    });
  }

  logMessagePayload(args: any) {
    console.log(this.messages[args][1].payload);
  }
}
