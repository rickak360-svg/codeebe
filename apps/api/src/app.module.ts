import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { LeadsModule } from './leads/leads.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { ServicesModule } from './services/services.module';
import { TeamModule } from './team/team.module';

/** BullMQ jobs demo — requires Redis. Leads API works without it. */
function getQueueModules(): Array<Type<unknown> | DynamicModule> {
  if (process.env.REDIS_ENABLED === 'false') {
    return [];
  }
  const { QueueModule } = require('./queue/queue.module') as {
    QueueModule: Type<unknown>;
  };
  return [QueueModule];
}

@Module({
  imports: [
    PrismaModule,
    ...getQueueModules(),
    LeadsModule,
    ProjectsModule,
    TeamModule,
    ServicesModule,
    AdminModule,
  ],  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
