import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  icon: LucideIcon;
  link?: string;
}

export interface ServiceCardProps {
  service: Service;
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
}

export interface ServicesData {
  services: Service[];
  sectionTitle: string;
  sectionNumber: string;
}
