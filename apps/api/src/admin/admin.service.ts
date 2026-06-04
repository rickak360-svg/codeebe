import { Injectable } from '@nestjs/common';
import { LeadStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from '../projects/projects.service';
import { ServicesService } from '../services/services.service';
import { TeamService } from '../team/team.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectsService: ProjectsService,
    private readonly teamService: TeamService,
    private readonly servicesService: ServicesService,
  ) {}

  async getOverview() {
    const [
      leadsTotal,
      leadsNew,
      leadsMeeting,
      leadsConverted,
      projects,
      team,
      services,
      recentLeads,
    ] = await Promise.all([
      this.prisma.lead.count(),
      this.prisma.lead.count({ where: { status: LeadStatus.new } }),
      this.prisma.lead.count({
        where: { status: LeadStatus.meeting_scheduled },
      }),
      this.prisma.lead.count({ where: { status: LeadStatus.converted } }),
      this.projectsService.countStats(),
      this.teamService.countStats(),
      this.servicesService.countStats(),
      this.prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          fullName: true,
          email: true,
          projectType: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return {
      leads: {
        total: leadsTotal,
        new: leadsNew,
        meetingScheduled: leadsMeeting,
        converted: leadsConverted,
      },
      projects,
      team,
      services,
      recentLeads: recentLeads.map((l) => ({
        ...l,
        createdAt: l.createdAt.toISOString(),
      })),
    };
  }
}
