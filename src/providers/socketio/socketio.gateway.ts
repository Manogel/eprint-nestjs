import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';

@WebSocketGateway()
export class SocketioGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    console.log('Socket channel', client.id);
    console.log('Socket params', client.handshake.query);
  }

  async handleDisconnect(client: Socket) {
    console.log('Socket disconnected', client.id);
  }

  @SubscribeMessage('chat')
  async onChat(client: Socket, message: string) {
    client.broadcast.emit('chat', message);
  }
}
