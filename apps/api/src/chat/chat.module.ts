import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { LeadsModule } from '../leads/leads.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [LeadsModule, MailModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
