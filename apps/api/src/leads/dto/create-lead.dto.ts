import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  fullName!: string;

  @IsEmail()
  @MaxLength(160)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  phone!: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  companyName?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  projectType!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  description!: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(40)
  @IsString({ each: true })
  @MaxLength(120, { each: true })
  features!: string[];

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  timeline!: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  budgetRange?: string;

  @IsOptional()
  @IsIn(['estimate', 'contact'])
  source?: 'estimate' | 'contact';
}

export class UpdateLeadStatusDto {
  @IsIn([
    'new',
    'contacted',
    'meeting_scheduled',
    'proposal_sent',
    'converted',
    'lost',
  ])
  status!:
    | 'new'
    | 'contacted'
    | 'meeting_scheduled'
    | 'proposal_sent'
    | 'converted'
    | 'lost';
}
