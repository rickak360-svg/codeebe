export class CreateLeadDto {
  fullName!: string;
  email!: string;
  phone!: string;
  companyName?: string;
  projectType!: string;
  description!: string;
  features!: string[];
  timeline!: string;
  budgetRange?: string;
  source?: 'estimate' | 'contact';
}

export class UpdateLeadStatusDto {
  status!:
    | 'new'
    | 'contacted'
    | 'meeting_scheduled'
    | 'proposal_sent'
    | 'converted'
    | 'lost';
}
