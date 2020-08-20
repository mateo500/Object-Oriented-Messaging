import { v4 as uuidGenerator } from 'uuid';
import GlobalEmitter from './GlobalEmiter';
import moment from 'moment';

interface IGlobalMessagingPool {
  insertMessageInPool(context: string, message: IMessage): void;
  removeMessageFromPool(index: string): any;
  getPoolSize(): number;
  getPool(): void;
  poolActive: boolean;
  size: number;
  getLoggedMessages(): any[];
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
}

export class GlobalMessagingPool implements IGlobalMessagingPool {
  public poolActive: boolean = false;

  private pool: any = {};

  public size: number;

  private logger: any[] = [];

  constructor() {
    this.poolActive = true;
    this.size = 0;
    console.log('Pool initiated');
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
      Operation: 'Message Added To Pool',
      MessageContext: newMessage[0],
      From: newMessage[1].from,
      To: newMessage[1].to,
      IndexInPool: newMessage[1].indexInPool,
      timeStamp: moment().format('LLL'),
    };
    this.logger.push({ ...operationData, payload: newMessage[1].payload });
    console.table(operationData);
  }

  removeMessageFromPool(uuid: string): any {
    let removed = this.pool[uuid];
    delete this.pool[uuid];
    this.size--;
    const operationData: IOperationData = {
      Operation: 'Message Removed From Pool',
      MessageContext: removed[0],
      From: removed[1].from,
      To: removed[1].to,
      IndexInPool: removed[1].indexInPool,
      timeStamp: moment().format('LLL'),
    };
    this.logger.push({ ...operationData, payload: removed[1].payload });
    console.table(operationData);
  }

  getPoolSize(): number {
    return this.size;
  }

  getPool() {
    return this.pool;
  }

  getLoggedMessages(): any[] {
    return this.logger;
  }
}

export default new GlobalMessagingPool();
