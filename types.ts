export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description?: string;
  techStack?: string[];
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  icon?: string;
}