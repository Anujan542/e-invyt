/* eslint-disable @typescript-eslint/no-explicit-any */
import Beach from './templates/Beach';
import CinematicLove from './templates/CinematicLove';
import EligantBliss from './templates/ElegantBliss';
import HinduWedding from './templates/HinduTemple';
import Peacock from './templates/Peacock';
import MughalDreams from './templates/Taj';

export const templateMap: Record<string, React.FC<any>> = {
  'Cinematic Love': CinematicLove,
  'Elegant Bliss': EligantBliss,
  'Hindu Wedding': HinduWedding,
  'Beach Wind': Beach,
  'Feather Fly': Peacock,
  'Mughal Dreams': MughalDreams,
};
