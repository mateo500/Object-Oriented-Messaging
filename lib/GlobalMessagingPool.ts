import { v4 as uuidGenerator } from "uuid";
import GlobalEmitter from "./GlobalEmiter";
import moment from "moment";

interface IGlobalMessagingPool {
  insertMessageInPool(context: string, message: IMessage): void;
  removeMessageFromPool(index: string): any;
  getPoolSize(): number;
  getPool(): void;
  getLoggedMessages(): any[];
  isPoolActive(): boolean;
}

interface IMessage {
  payload: string;
  from: string;
  to: string;
  indexInPool?: string;
}

interface IOperationData {
  Operation: string;
  MessageContext: string;
  From: string;
  To: string;
  IndexInPool?: string;
  timeStamp: string;
  payload: string | object;
}

export class GlobalMessagingPool implements IGlobalMessagingPool {
  private poolActive: boolean = false;

  private pool: any = {};

  private size: number;

  private logger: any[] = [];

  constructor() {
    this.poolActive = true;
    this.size = 0;
    console.log("Pool initiated");
  }

  insertMessageInPool(context: string, message: IMessage) {
    this.size++;
    const generateMessageId = uuidGenerator();
    const newMessage: [string, IMessage] = [
      context,
      { ...message, indexInPool: generateMessageId },
    ];
    this.pool[
      newMessage[1].indexInPool ? newMessage[1].indexInPool : this.size
    ] = newMessage;
    GlobalEmitter.emit(context, newMessage[1].indexInPool);
    const operationData: IOperationData = {
      Operation: "Message Added To Pool",
      MessageContext: newMessage[0],
      From: newMessage[1].from,
      To: newMessage[1].to,
      IndexInPool: newMessage[1].indexInPool,
      timeStamp: moment().format("LLL"),
      payload: JSON.stringify(newMessage[1].payload),
    };
    this.logger.push(operationData);
    console.table(operationData);
  }

  removeMessageFromPool(uuid: string): any {
    let removed = this.pool[uuid];
    delete this.pool[uuid];
    this.size--;
    const operationData: IOperationData = {
      Operation: "Message Removed From Pool",
      MessageContext: removed[0],
      From: removed[1].from,
      To: removed[1].to,
      IndexInPool: removed[1].indexInPool,
      timeStamp: moment().format("LLL"),
      payload: removed[1].payload,
    };
    this.logger.push(operationData);
    console.table(operationData);
  }

  getPoolSize(): number {
    return this.size;
  }

  getPool(): any {
    return this.pool;
  }

  getLoggedMessages(): any[] {
    return this.logger;
  }

  isPoolActive(): boolean {
    return this.poolActive;
  }
}

export default new GlobalMessagingPool();
