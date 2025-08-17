import { AbsoluteFill, Audio, OffthreadVideo, Sequence } from 'remotion';
import Cinematic from './assets/Cinematic.mp4';
import Background from './assets/Background.mp4';
import { WeddingInvite } from './WeddingInviteText';
import { AnimatedHeart } from '../../components/Effects/AnimatedHeart';
import { SaveTheDateText } from './SaveTheDateText';
import { FadeInOut } from '../../components/Effects/FadeTransition';
import type { WeddingProps } from '../types/wedding.types';

const CinematicLove = ({
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
      <Audio src={`${audio}`} />
      <Sequence durationInFrames={300}>
        <OffthreadVideo
          src={Cinematic}
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: 'auto',
          }}
          startFrom={60}
        />
        <div
          style={{
            fontFamily: 'Georgia, serif',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        ></div>
      </Sequence>

      <Sequence from={180} durationInFrames={195}>
        <FadeInOut inDuration={15} outDuration={15} totalDuration={195}>
          <OffthreadVideo
            src={Background}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: 'auto',
            }}
          />

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
      </Sequence>

      <Sequence from={375} durationInFrames={200}>
        <FadeInOut inDuration={15} outDuration={10} totalDuration={179}>
          <OffthreadVideo
            src={Background}
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
            <AnimatedHeart color={color!} />
            <SaveTheDateText color={color!} eventDate={eventDate} />
          </AbsoluteFill>
        </FadeInOut>
      </Sequence>
    </AbsoluteFill>
  );
};

export default CinematicLove;
