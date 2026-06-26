import {
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { Response } from 'express';
import { QuotationService } from './quotation.service';

@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotation: QuotationService) {}

  @Get(':token/pdf')
  async downloadPdf(@Param('token') token: string, @Res({ passthrough: true }) res: Response) {
    const buffer = await this.quotation.getPdfByToken(token);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="codeebe-quotation.pdf"`,
    });
    return new StreamableFile(buffer);
  }

  @Get(':token')
  async getQuotation(@Param('token') token: string) {
    return this.quotation.getByToken(token);
  }

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post(':token/interest')
  @HttpCode(200)
  async markInterested(@Param('token') token: string) {
    return this.quotation.markInterest(token, 'interested');
  }

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post(':token/meeting')
  @HttpCode(200)
  async requestMeeting(@Param('token') token: string) {
    return this.quotation.markInterest(token, 'meeting_requested');
  }
}
