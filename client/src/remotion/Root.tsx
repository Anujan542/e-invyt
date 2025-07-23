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

  // const name = 'Hindu Wedding';
  // const duration = 600;
  // const groomName = 'Mathavan';
  // const brideName = 'Monica';
  // const groomFamilyInfo = 'Son of Mr & Mrs Arivalakan';
  // const brideFamilyInfo = 'Daughter of Mr & Mrs Sivakumar';
  // const welcomeMessage = 'Joyfully invite you to celebrate their wedding day!';
  // const eventDate = '20 | November | 2025';
  // const eventVenue = '4 PM at Lee Maridean Hall, Kalmunai-02';
  // const color = '#00000';
  // const audio = song;

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
