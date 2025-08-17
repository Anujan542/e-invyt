import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import type { SaveDayProps } from '../types/wedding.types';

export const SaveTheDateText = ({ color, eventDate }: SaveDayProps) => {
const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn = (start: number, duration: number) =>
    interpolate(frame, [start, start + duration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 6,
      stiffness: 100,
    },
  });

  const opacity = spring({
    frame: frame - 10,
    fps,
  });

  return (
    <>
      <div
        style={{
          marginBottom: '15rem',
          marginTop: '0rem',
        }}
      >
        {/* Venue Text */}
        <div
          style={{
            opacity: fadeIn(10, 10),
            fontSize: '3rem',
            fontFamily: 'Roboto',
            color: color,
            width: '800px',
            textTransform: 'uppercase',
            letterSpacing: '0.5rem',
            fontWeight: 900,
            textAlign: 'center',
          }}
        >
          {eventDate}
        </div>
      </div>

      <div
        style={{
          fontFamily: '',
          color: color,
          textAlign: 'center',
          transform: `scale(${scale})`,
          opacity,
          fontWeight: 'bolder',
        }}
      >
        <div style={{ textAlign: 'center', display: 'flex', color: color }}>
          <h1
            style={{
              fontSize: '5rem',
              fontFamily: 'serif',
              letterSpacing: 2,
              margin: 0,
            }}
          >
            SAVE
          </h1>
          <h2
            style={{
              fontSize: '7rem',
              fontFamily: '"Dancing Script", cursive',
              fontWeight: 400,
              margin: 0,
            }}
          >
            the
          </h2>
          <h1
            style={{
              fontSize: '8rem',
              fontFamily: 'serif',
              letterSpacing: 2,
              margin: 0,
            }}
          >
            DATE
          </h1>
        </div>
      </div>
    </>
  );
};
