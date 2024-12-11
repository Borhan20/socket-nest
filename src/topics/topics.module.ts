import { Module } from '@nestjs/common';
import { TopicsService } from './service/topics.service';
import { TopicGateway } from "./gateway/topic.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { Topic, TopicSchema } from "./schema/topic.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name:Topic.name, schema: TopicSchema}])
  ],
  providers: [
    TopicsService,
    TopicGateway
  ]
})
export class TopicsModule {}
