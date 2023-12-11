import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket, Server } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }
    //console.log('Client connected', client.id);
    this.wss.emit('clients-update', this.messagesWsService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    //console.log('Client disconnected', client.id);
    this.messagesWsService.removeClient(client.id);
    this.wss.emit('clients-update', this.messagesWsService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    console.log(client.id, payload);

    //! Emits only to the client
    // client.emit('message-from-server', {
    //   fullName: `It's me`,
    //   message: payload.message || 'no meesage',
    // });

    //! Emits to everyone, but the initial client
    // client.broadcast.emit('message-from-server', {
    //   fullName: `It's me`,
    //   message: payload.message || 'no meesage',
    // });

    //! Emits to everyone
    this.wss.emit('message-from-server', {
        fullName: this.messagesWsService.getUserFullName(client.id),
        message: payload.message || 'no meesage',
    });
  }
}
