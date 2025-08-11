import { AbsoluteFill, Audio, OffthreadVideo, Sequence } from 'remotion';
import beach from './assets/beach.mp4';
import { EventDate } from './EventDate';
import { FadeInOut } from '../../components/Effects/FadeTransition';
import type { WeddingProps } from '../types/wedding.types';
import { WelcomeMessage } from './WelcomMessage';
import { Main } from './Main';
import { SaveTheDateText } from './SaveTheDateText';

const Beach = ({
  groomName,
  brideName,
  groomFamilyInfo,
  brideFamilyInfo,
  eventDate,
  eventVenue,
  welcomeMessage,
  color,
  audio,
}: WeddingProps) => {
  return (
    <AbsoluteFill style={{ fontFamily: 'Georgia, serif' }}>
      <Audio src={`${audio}`} startFrom={0} />
      <Sequence durationInFrames={240}>
        <OffthreadVideo
          src={beach}
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: 'auto',
          }}
        />
        <Sequence from={0} durationInFrames={100}>
          <FadeInOut inDuration={5} outDuration={10} totalDuration={100}>
            <EventDate eventDate={eventDate} color={color} />
          </FadeInOut>
        </Sequence>
        <Sequence from={95} durationInFrames={240}>
          <WelcomeMessage welcomeMessage={welcomeMessage} color={color} />
        </Sequence>
      </Sequence>
      <Sequence from={230} durationInFrames={460}>
        <FadeInOut inDuration={5} outDuration={10} totalDuration={460}>
          <OffthreadVideo
            src={beach}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: 'auto',
            }}
          />

          <Main
            brideName={brideName}
            groomName={groomName}
            groomFamilyInfo={groomFamilyInfo}
            brideFamilyInfo={brideFamilyInfo}
            eventDate={eventDate}
            eventVenue={eventVenue}
            welcomeMessage={welcomeMessage}
            color={color}
          />
        </FadeInOut>
      </Sequence>

      <Sequence from={450} durationInFrames={150}>
        <FadeInOut inDuration={15} outDuration={10} totalDuration={179}>
          <OffthreadVideo
            src={beach}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: 'auto',
            }}
          />
          <AbsoluteFill
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SaveTheDateText color={color!} eventDate={eventDate!} />
          </AbsoluteFill>
        </FadeInOut>
      </Sequence>

      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          // opacity: 0.3,
          fontSize: 40,
          color: 'white',
          pointerEvents: 'none',
        }}
      >
        © e-invyt.com
      </div>
    </AbsoluteFill>
  );
};

export default Beach;
