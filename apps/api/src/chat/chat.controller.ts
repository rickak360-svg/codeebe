import { Controller, Post, Get, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto, CompleteChatDto, ChatResponseDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('session')
  createSession(): { sessionId: string } {
    const sessionId = this.chatService.createSession();
    return { sessionId };
  }

  @Post('message')
  async sendMessage(@Body() dto: SendMessageDto): Promise<ChatResponseDto> {
    if (!this.chatService.isEnabled) {
      throw new HttpException(
        'Chat service is currently unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const result = await this.chatService.sendMessage(
      dto.sessionId,
      dto.message,
      dto.conversationHistory,
    );

    return result;
  }

  @Post('complete')
  async completeChat(@Body() dto: CompleteChatDto): Promise<{ success: boolean; leadId?: string; message: string }> {
    const result = await this.chatService.completeChat(dto.sessionId, dto.extractedData);

    if (result.success) {
      return {
        success: true,
        leadId: result.leadId,
        message: 'Perfect! I\'ve sent a detailed estimate to your email. Check your inbox in the next few minutes.',
      };
    }

    throw new HttpException(
      'Failed to process your request. Please try again.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Get('session/:sessionId')
  getSession(@Param('sessionId') sessionId: string) {
    const session = this.chatService.getSession(sessionId);
    
    if (!session) {
      throw new HttpException('Session not found or expired', HttpStatus.NOT_FOUND);
    }

    return {
      sessionId: session.sessionId,
      messages: session.messages,
      extractedData: session.extractedData,
    };
  }
}
