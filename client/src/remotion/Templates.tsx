/* eslint-disable @typescript-eslint/no-explicit-any */
import CinematicLove from "./templates/CinematicLove";
import EligantBliss from "./templates/ElegantBliss";
import HinduWedding from './templates/HinduTemple';

export const templateMap: Record<string, React.FC<any>> = {
  'Cinematic Love': CinematicLove,
  'Elegant Bliss': EligantBliss,
  'Hindu Wedding': HinduWedding,
};
