import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

import './fonts/Text.css';
import type { WeddingProps } from '../types/wedding.types';

export const WeddingInvite = ({
  groomName,
  brideName,
  groomFamilyInfo,
  brideFamilyInfo,
  color,
}: WeddingProps) => {
  const frame = useCurrentFrame();

  const fadeIn = (start: number, duration: number) =>
    interpolate(frame, [start, start + duration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const slideIn = (start: number, duration: number, from: 'left' | 'right') => {
    const direction = from === 'left' ? -100 : 100;
    return interpolate(frame, [start, start + duration], [direction, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

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
            opacity: fadeIn(25, 10),
            transform: `translateX(${slideIn(25, 15, 'left')}px)`,
            fontSize: '10rem',
            fontFamily: 'Great Vibes',
            marginTop: '2rem',
            marginBottom: '2rem',
            color: color,
            fontWeight: 'bolder',
          }}
        >
          {groomName}
        </div>
        <div
          style={{
            opacity: fadeIn(30, 10),
            fontSize: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2rem',
            fontWeight: 'bolder',
            color: color,
          }}
        >
          {groomFamilyInfo}
        </div>
        <div
          style={{
            opacity: fadeIn(35, 10),
            transform: `translateX(${slideIn(35, 15, 'right')}px)`,
            fontSize: '10rem',
            fontFamily: 'Great Vibes',
            marginTop: '3rem',
            fontWeight: 'bolder',
            color: color,
          }}
        >
          &
        </div>
        <div
          style={{
            opacity: fadeIn(40, 10),
            transform: `translateX(${slideIn(40, 15, 'right')}px)`,
            fontSize: '10rem',
            fontFamily: 'Great Vibes',
            marginTop: '1rem',
            fontWeight: 'bolder',
            color: color,
          }}
        >
          {brideName}
        </div>
        <div
          style={{
            opacity: fadeIn(45, 10),
            fontSize: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2rem',
            color: color,
            fontWeight: 'bolder',
          }}
        >
          {brideFamilyInfo}
        </div>
      </AbsoluteFill>
    </>
  );
};
