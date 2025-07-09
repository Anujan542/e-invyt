import { Composition } from "remotion";
import CinematicLove from "./templates/CinematicLove";
import hey from './templates/CinematicLove/assets/hey.mp3';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={CinematicLove}
        durationInFrames={575}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          groomName: 'Anujan',
          brideName: 'Niromy',
          groomFamilyInfo: 'Son of Mr & Mrs Nesarajah',
          brideFamilyInfo: 'Daughter of Mr & Mrs Kanthasamy',
          welcomeMessage:
            'With great pleasure, our families invite you to join us for the wedding reception of',
          eventDate: '17 | November | 2024',
          eventVenue: 'At six clock in the evening',
          color: 'red',
          audio: hey,
        }}
      />
    </>
  );
};
