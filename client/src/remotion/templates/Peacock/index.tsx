import { AbsoluteFill, Audio, OffthreadVideo, Sequence } from 'remotion';
import peacockFly from './assets/test.mp4';
import NoPeacock from './assets/pea.mp4';
import cock from './assets/peacock.jpg';
import { EventDate } from './EventDate';
import { FadeInOut } from '../../components/Effects/FadeTransition';
import type { WeddingProps } from '../types/wedding.types';
import { Main } from './Main';
import { SaveTheDateText } from './SaveTheDateText';

const Peacock = ({
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
      <Sequence durationInFrames={400}>
        <img src={cock} alt="template" />

        <Sequence from={95} durationInFrames={400}>
          <OffthreadVideo
            src={peacockFly}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: 'auto',
            }}
          />
        </Sequence>
        <Sequence from={0} durationInFrames={400}>
          <FadeInOut inDuration={5} outDuration={10} totalDuration={270}>
            <EventDate eventDate={eventDate} color={color} welcomeMessage={welcomeMessage} />
          </FadeInOut>
        </Sequence>
      </Sequence>

      <Sequence from={390} durationInFrames={210}>
        <FadeInOut inDuration={5} outDuration={10} totalDuration={460}>
          <OffthreadVideo
            src={NoPeacock}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: 'auto',
            }}
          />
          <FadeInOut inDuration={5} outDuration={10} totalDuration={100}>
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
          <Sequence from={100} durationInFrames={200}>
            <AbsoluteFill
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <SaveTheDateText color={color!} eventVenue={eventVenue!} />
            </AbsoluteFill>
          </Sequence>
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

export default Peacock;
