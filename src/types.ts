export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
  category: string;
  type: string;
  postedAt: string;
  source: string;
  employerId?: string;
  logo?: string;
  salary?: string;
}

export interface Employer {
  uid: string;
  email: string;
  companyName: string;
  website?: string;
  logo?: string;
}

export interface JobFilter {
  search: string;
  location: string;
  type: string;
}
