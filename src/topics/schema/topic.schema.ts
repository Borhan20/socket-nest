import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Topic extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ default: [] })
  comments: { user: string; comment: string }[];

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  dislikes: number;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
