import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpsertShowcaseProjectDto } from './dto/upsert-project.dto';
import { ProjectsService } from './projects.service';
import type { UpsertShowcaseProjectInput } from './types/project.types';

@Controller('admin/projects')
export class AdminProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOneAdmin(id);
  }

  @Post()
  create(@Body() body: UpsertShowcaseProjectDto) {
    return this.projectsService.create(body as UpsertShowcaseProjectInput);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<UpsertShowcaseProjectDto>,
  ) {
    return this.projectsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.projectsService.remove(id);
    return { deleted: true, id };
  }
}
