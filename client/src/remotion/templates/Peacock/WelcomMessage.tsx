import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

import './fonts/Text.css';
import type { WeddingProps } from '../types/wedding.types';
import { PoppingWordsAnimated } from '../../components/Effects/PoppingWordsAnimated';

export const WelcomeMessage = ({ welcomeMessage, color }: WeddingProps) => {
  const frame = useCurrentFrame();

  const fadeIn = (start: number, duration: number) =>
    interpolate(frame, [start, start + duration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  return (
    <>
      <AbsoluteFill
        style={{
          color: '#2b2b2b',
          fontFamily: 'Georgia, serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            opacity: fadeIn(0, 10),
            marginBottom: '8rem',
            marginTop: '3rem',
            color: color,
            letterSpacing: '1.5px',
            fontWeight: 'bolder',
          }}
        >
          <PoppingWordsAnimated welcomeMessage={`${welcomeMessage}`} color={color} />
        </div>
      </AbsoluteFill>
    </>
  );
};
