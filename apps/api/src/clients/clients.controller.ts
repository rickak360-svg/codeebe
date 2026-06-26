import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ClientsService } from './clients.service';
import { ClientPortalDto } from './dto/client-portal.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clients: ClientsService) {}

  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('portal')
  portal(@Body() body: ClientPortalDto) {
    return this.clients.getPortalByEmail(body.email);
  }
}
