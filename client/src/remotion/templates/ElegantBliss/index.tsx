import { AbsoluteFill, Audio, OffthreadVideo, Sequence } from "remotion";
import Eligant from './assets/eligant.mp4';
import { WeddingInvite } from './WeddingInviteText';
import { SaveTheDateText } from './SaveTheDateText';
import { FadeInOut } from '../../components/Effects/FadeTransition';
import type { WeddingProps } from '../types/wedding.types';

const EligantBliss = ({
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
          src={Eligant}
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
      </Sequence>

      <Sequence from={200} durationInFrames={195}>
        <FadeInOut inDuration={15} outDuration={10} totalDuration={179}>
          <OffthreadVideo
            src={Eligant}
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
            {/* <AnimatedHeart color={color} /> */}
            <SaveTheDateText color={color!} eventDate={eventDate} />
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

export default EligantBliss;
