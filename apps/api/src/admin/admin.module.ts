import { Module } from '@nestjs/common';
import { ProjectsModule } from '../projects/projects.module';
import { ServicesModule } from '../services/services.module';
import { TeamModule } from '../team/team.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [ProjectsModule, TeamModule, ServicesModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
