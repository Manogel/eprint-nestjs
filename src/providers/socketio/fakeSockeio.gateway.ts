/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISocketEvents } from './dtos/socket-events-dto';

export class FakeSocketioGateway {
  listAllChannels() {
    return [];
  }

  emit(_event: string, _data: any, _channel?: string) {
    //
  }

  broadcast(_event: string, _data: any) {
    //
  }

  findChannel(_key: string) {
    //
  }

  async emitToUser(_toUser: string, _event: ISocketEvents, _data: any) {
    //
  }
}
