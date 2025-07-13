/* eslint-disable @typescript-eslint/no-explicit-any */
import CinematicLove from "./templates/CinematicLove";
import EligantBliss from "./templates/ElegantBliss";

export const templateMap: Record<string, React.FC<any>> = {
  'Cinematic Love': CinematicLove,
  'Elegant Bliss': EligantBliss,
  // 'Royal Vows': RoyalVows,
  // Add more as needed
};
