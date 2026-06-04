export class UpsertShowcaseProjectDto {
  slug!: string;
  name!: string;
  category!: string;
  shortDescription!: string;
  techStack!: string[];
  overview!: string;
  problemSolved!: string;
  keyFeatures!: string[];
  businessValue!: string;
  costRange!: string;
  published?: boolean;
  sortOrder?: number;
}
