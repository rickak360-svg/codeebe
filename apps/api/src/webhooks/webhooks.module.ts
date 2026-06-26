import { Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { WebhooksController } from './webhooks.controller';

@Module({
  imports: [MailModule],
  controllers: [WebhooksController],
})
export class WebhooksModule {}
