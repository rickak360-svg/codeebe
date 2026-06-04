import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  JOBS,
  QUEUES,
  type ExampleJobPayload,
} from '@codeebe/queue';

@Controller('jobs')
export class JobsController {
  constructor(
    @InjectQueue(QUEUES.DEFAULT) private readonly defaultQueue: Queue,
  ) {}

  @Post('example')
  async enqueueExample(@Body() body: { message?: string }) {
    const payload: ExampleJobPayload = {
      message: body.message ?? 'Hello from API',
      requestedAt: new Date().toISOString(),
    };

    const job = await this.defaultQueue.add(JOBS.EXAMPLE, payload);

    return {
      jobId: job.id,
      name: job.name,
      queue: QUEUES.DEFAULT,
    };
  }

  @Get(':id')
  async getJobStatus(@Param('id') id: string) {
    const job = await this.defaultQueue.getJob(id);
    if (!job) {
      throw new NotFoundException(`Job ${id} not found`);
    }

    const state = await job.getState();

    return {
      id: job.id,
      name: job.name,
      queue: QUEUES.DEFAULT,
      state,
      data: job.data,
      result: job.returnvalue,
      failedReason: job.failedReason,
    };
  }
}
