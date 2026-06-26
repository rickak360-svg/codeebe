import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpsertShowcaseProjectDto {
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  shortDescription!: string;

  @IsArray()
  @IsString({ each: true })
  techStack!: string[];

  @IsString()
  overview!: string;

  @IsString()
  problemSolved!: string;

  @IsArray()
  @IsString({ each: true })
  keyFeatures!: string[];

  @IsString()
  businessValue!: string;

  @IsString()
  costRange!: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
