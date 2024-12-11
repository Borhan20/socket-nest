import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TopicsService } from '../service/topics.service';

@WebSocketGateway({ namespace: '/socket' })
export class TopicGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly topicsService: TopicsService) {}

  // Log when a client connects
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Log when a client disconnects
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createPost')
  async handleCreatePost(@MessageBody() content: string) {
    console.log('Received createPost:', content);
    const post = await this.topicsService.createPost(content);
    this.server.emit('postCreated', post);
  }

  @SubscribeMessage('addComment')
  async handleAddComment(
    @MessageBody() data: { postId: string; user: string; comment: string },
  ) {
    console.log('Received addComment:', data);
    const updatedPost = await this.topicsService.addComment(data.postId, data.user, data.comment);
    this.server.emit('commentAdded', updatedPost);
  }

  @SubscribeMessage('updateLikes')
  async handleUpdateLikes(@MessageBody() data: { postId: string; increment: boolean }) {
    console.log('Received updateLikes:', data);
    const updatedPost = await this.topicsService.updateLikes(data.postId, data.increment);
    this.server.emit('likesUpdated', updatedPost);
  }
}
