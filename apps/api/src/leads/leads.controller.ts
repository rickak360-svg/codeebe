import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CreateLeadDto, UpdateLeadStatusDto } from './dto/create-lead.dto';
import { LeadsService } from './leads.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  /** Public form submission — strictly rate-limited to prevent abuse. */
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post()
  create(@Body() body: CreateLeadDto) {
    return this.leadsService.create(body);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateLeadStatusDto,
  ) {
    return this.leadsService.updateStatus(id, body.status);
  }
}
