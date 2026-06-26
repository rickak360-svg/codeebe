import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { LeadsModule } from './leads/leads.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { QuotationModule } from './quotation/quotation.module';
import { ServicesModule } from './services/services.module';
import { TeamModule } from './team/team.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { ClientsModule } from './clients/clients.module';

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
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    PrismaModule,
    AuthModule,
    ...getQueueModules(),
    LeadsModule,
    MailModule,
    QuotationModule,
    ProjectsModule,
    TeamModule,
    ServicesModule,
    AdminModule,
    WebhooksModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
