import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

import './fonts/Text.css';
import type { WeddingProps } from '../types/wedding.types';

export const WeddingInvite = ({
  groomName,
  brideName,
  groomFamilyInfo,
  brideFamilyInfo,
  eventDate,
  eventVenue,
  welcomeMessage,
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
            opacity: fadeIn(15, 10),
            fontSize: '2.5rem',
            maxWidth: '850px',
            marginBottom: '8rem',
            marginTop: '3rem',
            color: color,
            letterSpacing: '1.5px',
            fontWeight: 'bolder',
            textTransform: 'uppercase',
          }}
        >
          {welcomeMessage}
        </div>

        <div
          style={{
            opacity: fadeIn(25, 10),
            transform: `translateX(${slideIn(25, 15, 'left')}px)`,
            fontSize: '10rem',
            fontFamily: 'Great Vibes',
            marginTop: '2rem',
            marginBottom: '2rem',
            color: color,
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
          }}
        >
          {brideFamilyInfo}
        </div>

        <div
          style={{
            opacity: fadeIn(60, 10),
            marginTop: '5rem',
            fontWeight: 'bold',
            fontSize: '4rem',
            color: color,
            textTransform: 'uppercase',
          }}
        >
          {eventDate}
        </div>
        <div
          style={{
            opacity: fadeIn(80, 10),
            marginTop: '5rem',
            fontWeight: 'bold',
            fontSize: '2.5rem',
            color: color,
            textTransform: 'uppercase',
            letterSpacing: '0.2rem',
          }}
        >
          {eventVenue}
        </div>
      </AbsoluteFill>
    </>
  );
};