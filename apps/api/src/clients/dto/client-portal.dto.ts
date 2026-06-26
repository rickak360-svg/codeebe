import { IsEmail, IsNotEmpty } from 'class-validator';

export class ClientPortalDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
