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
import { UpsertTeamMemberDto } from './dto/upsert-team.dto';
import { TeamService } from './team.service';
import type { UpsertTeamMemberInput } from './types/team.types';
import { AdminGuard } from '../auth/admin.guard';

@UseGuards(AdminGuard)
@Controller('admin/team')
export class AdminTeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  findAll() {
    return this.teamService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOneAdmin(id);
  }

  @Post()
  create(@Body() body: UpsertTeamMemberDto) {
    return this.teamService.create(body as UpsertTeamMemberInput);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<UpsertTeamMemberDto>,
  ) {
    return this.teamService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.teamService.remove(id);
    return { deleted: true, id };
  }
}
