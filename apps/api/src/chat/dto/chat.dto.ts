import { IsString, IsOptional, IsArray, ValidateNested, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class ChatMessage {
  @IsString()
  role: 'user' | 'assistant' | 'system';

  @IsString()
  content: string;

  @IsOptional()
  timestamp?: string;
}

export class SendMessageDto {
  @IsString()
  sessionId: string;

  @IsString()
  message: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessage)
  @IsOptional()
  conversationHistory?: ChatMessage[];
}

export class ExtractedLeadData {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  projectType: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsString()
  @IsOptional()
  timeline?: string;

  @IsString()
  @IsOptional()
  budgetRange?: string;

  @IsString()
  @IsOptional()
  companyName?: string;
}

export class CompleteChatDto {
  @IsString()
  sessionId: string;

  @ValidateNested()
  @Type(() => ExtractedLeadData)
  extractedData: ExtractedLeadData;
}

export class ChatResponseDto {
  message: string;
  sessionId: string;
  shouldShowCalendly?: boolean;
  shouldCollectLead?: boolean;
  estimateSent?: boolean;
  extractedData?: Partial<ExtractedLeadData>;
}
