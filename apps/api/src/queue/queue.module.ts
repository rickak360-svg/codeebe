import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { getRedisConnection, QUEUES } from '@codeebe/queue';
import { JobsController } from '../jobs/jobs.controller';

@Module({
  imports: [
    BullModule.forRoot({
      connection: getRedisConnection(),
    }),
    BullModule.registerQueue({
      name: QUEUES.DEFAULT,
    }),
  ],
  controllers: [JobsController],
})
export class QueueModule {}
