import { Composition } from "remotion";
import song from './components/songs/hey.mp3';
import { templateMap } from './Templates';

export const RemotionRoot: React.FC = () => {
  const name = 'Elegant Bliss';
  const duration = 400;
  const groomName = 'Anujan';
  const brideName = 'Niromy';
  const groomFamilyInfo = 'Son of Mr & Mrs Nesarajah';
  const brideFamilyInfo = 'Daughter of Mr & Mrs Kanthasamy';
  const welcomeMessage =
    'With great pleasure our families invite you to join us for the wedding reception of';
  const eventDate = '17 | November | 2024';
  const eventVenue = 'At six clock in the evening';
  const color = '#EEEEE';
  const audio = song;

  const SelectedComponent = templateMap[name];

  if (!SelectedComponent) {
    throw new Error(`Unknown template name: ${name}`);
  }

  return (
    <>
      <Composition
        id="MyComp"
        component={SelectedComponent}
        durationInFrames={duration}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          groomName: groomName,
          brideName: brideName,
          groomFamilyInfo: groomFamilyInfo,
          brideFamilyInfo: brideFamilyInfo,
          welcomeMessage: welcomeMessage,
          eventDate: eventDate,
          eventVenue: eventVenue,
          color: color,
          audio: audio,
        }}
      />
    </>
  );
};
