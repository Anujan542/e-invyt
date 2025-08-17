import { AbsoluteFill, Audio, OffthreadVideo, Sequence } from 'remotion';
import main from './assets/main.mp4';
import Background from './assets/background.mp4';
import { WeddingInvite } from './WeddingInviteText';
// import { AnimatedHeart } from '../../components/Effects/AnimatedHeart';
import { SaveTheDateText } from './SaveTheDateText';
import { FadeInOut } from '../../components/Effects/FadeTransition';
import type { WeddingProps } from '../types/wedding.types';

const MughalDreams = ({
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
      <Sequence durationInFrames={120}>
        <OffthreadVideo
          src={main}
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            height: 'auto',
          }}
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

      <Sequence from={115} durationInFrames={200}>
        <FadeInOut inDuration={1} outDuration={15} totalDuration={195}>
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

      <Sequence from={315} durationInFrames={200}>
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
            {/* <AnimatedHeart color={color!} /> */}
            <SaveTheDateText color={color!} eventDate={eventDate} />
          </AbsoluteFill>
        </FadeInOut>
      </Sequence>
    </AbsoluteFill>
  );
};

export default MughalDreams;
