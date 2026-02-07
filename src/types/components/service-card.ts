import { Service } from '../domain/services';

export interface ServiceCardProps {
  service: Service;
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
}
