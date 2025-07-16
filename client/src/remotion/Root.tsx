import { Composition, getInputProps } from 'remotion';
import song from './components/songs/hey.mp3';
import { templateMap } from './Templates';

type TemplateInputProps = {
  name: keyof typeof templateMap;
  duration: number;
  groomName: string;
  brideName: string;
  groomFamilyInfo: string;
  brideFamilyInfo: string;
  welcomeMessage: string;
  eventDate: string;
  eventVenue: string;
  color: string;
  audio: string;
};

export const RemotionRoot: React.FC = () => {
  const {
    name,
    duration,
    groomName,
    brideName,
    groomFamilyInfo,
    brideFamilyInfo,
    welcomeMessage,
    eventDate,
    eventVenue,
    color,
  } = getInputProps() as TemplateInputProps;

  const SelectedComponent = templateMap[name];

  if (!SelectedComponent) {
    throw new Error(`Unknown template name: ${name}`);
  }

  return (
    <>
      <Composition
        id="Einvyt"
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
          audio: song,
        }}
      />
    </>
  );
};
