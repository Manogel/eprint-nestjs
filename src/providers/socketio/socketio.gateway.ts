import redisConfig from '@config/redis';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { CacheService } from '@providers/cache/cache.service';
import { Socket, Server } from 'socket.io';
import { ISocketEvents } from './dtos/socket-events-dto';

const { keys } = redisConfig;

@WebSocketGateway()
export class SocketioGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly cacheService: CacheService) {}

  async handleConnection(client: Socket) {
    const { id: idChannel } = client;
    const { user_id } = client.handshake.query;
    const { userChannel } = redisConfig.keys;

    const keycache = userChannel(user_id);
    this.cacheService.save(keycache, idChannel);
  }

  async handleDisconnect(client: Socket) {
    const { user_id } = client.handshake.query;
    const { userChannel } = redisConfig.keys;

    const keycache = userChannel(user_id);
    this.cacheService.invalidade(keycache);
  }

  listAllChannels() {
    return this.cacheService.getKeysByPrefix('socket');
  }

  emit(event: string, data: any, channel?: string) {
    if (channel) {
      this.server.to(channel).emit(event, data);
    } else {
      this.server.emit(event, data);
    }
  }

  broadcast(event: string, data: any) {
    this.emit(event, data);
  }

  findChannel(key: string) {
    const keycache = keys.userChannel(key);

    return this.cacheService.recover<string>(keycache);
  }

  async emitToUser(toUser: string, event: ISocketEvents, data: any) {
    const channel = await this.findChannel(toUser);

    if (channel) {
      this.emit(event, data, channel);
      return true;
    }
    return false;
  }
}
