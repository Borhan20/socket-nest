import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic } from '../schema/topic.schema';

@Injectable()
export class TopicsService {
  constructor(@InjectModel(Topic.name) private topicModel: Model<Topic>) {}

  async createPost(content: string): Promise<Topic> {
    const post = new this.topicModel({ content });
    return post.save();
  }

  async addComment(
    postId: string,
    user: string,
    comment: string,
  ): Promise<Topic> {
    return this.topicModel.findByIdAndUpdate(
      postId,
      { $push: { comments: { user, comment } } },
      { new: true },
    );
  }

  async updateLikes(postId: string, increment: boolean): Promise<Topic> {
    return this.topicModel.findByIdAndUpdate(
      postId,
      { $inc: { likes: increment ? 1 : -1 } },
      { new: true },
    );
  }
}
