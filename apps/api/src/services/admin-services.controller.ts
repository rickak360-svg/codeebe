import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UpsertServiceItemDto } from './dto/upsert-service.dto';
import { ServicesService } from './services.service';
import type { UpsertServiceItemInput } from './types/service.types';
import { AdminGuard } from '../auth/admin.guard';

@UseGuards(AdminGuard)
@Controller('admin/services')
export class AdminServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll() {
    return this.servicesService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOneAdmin(id);
  }

  @Post()
  create(@Body() body: UpsertServiceItemDto) {
    return this.servicesService.create(body as UpsertServiceItemInput);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<UpsertServiceItemDto>,
  ) {
    return this.servicesService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.servicesService.remove(id);
    return { deleted: true, id };
  }
}
