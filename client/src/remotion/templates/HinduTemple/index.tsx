import { AbsoluteFill, Audio, OffthreadVideo, Sequence } from 'remotion';
import Temple from './assets/openart.mp4';
import End from './assets/end.mp4';
import { WeddingInvite } from './WeddingInviteText';
// import { SaveTheDateText } from './SaveTheDateText';
import { FadeInOut } from '../../components/Effects/FadeTransition';
import type { WeddingProps } from '../types/wedding.types';
import { WelcomeMessage } from './WelcomeMessage';
import { EventDetails } from './SaveTheDateText';
import SaveDate from './SaveDate';

const HinduWedding = ({
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
      <Audio src={`${audio}`}  />
      <Sequence durationInFrames={300}>
        <OffthreadVideo
          src={Temple}
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: 'auto',
          }}
        />
        <Sequence from={180}>
          <WelcomeMessage welcomeMessage={welcomeMessage} color={color} />
        </Sequence>
      </Sequence>

      <Sequence from={290}>
        <FadeInOut inDuration={5} outDuration={30} totalDuration={300}>
          <OffthreadVideo
            src={End}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: 'auto',
            }}
          />
          <FadeInOut inDuration={5} outDuration={10} totalDuration={140}>
            <WeddingInvite
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
          <Sequence from={130}>
            <AbsoluteFill
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <FadeInOut inDuration={5} outDuration={20} totalDuration={110}>
                <EventDetails color={color!} eventDate={eventDate!} eventVenue={eventVenue} />
              </FadeInOut>
            </AbsoluteFill>
          </Sequence>
          <Sequence from={230}>
            <AbsoluteFill
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <SaveDate color={color!} eventDate={eventDate!} eventVenue={eventVenue} />
            </AbsoluteFill>
          </Sequence>
        </FadeInOut>
      </Sequence>

      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          fontSize: 40,
          color: 'white',
          pointerEvents: 'none',
        }}
      >
        ©e-invyt.com
      </div>
    </AbsoluteFill>
  );
};

export default HinduWedding;
