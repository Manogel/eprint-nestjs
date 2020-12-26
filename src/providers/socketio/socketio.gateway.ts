import redisConfig from '@config/redis';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { CacheService } from '@providers/cache/cache.service';
import { Socket } from 'socket.io';
import { Server } from 'ws';

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

  @SubscribeMessage('chat')
  async onChat(client: Socket, message: string) {
    client.broadcast.emit('chat', message);
  }
}
