import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import type { SaveDayProps } from '../types/wedding.types';

export const SaveTheDateText = ({ color, eventVenue }: SaveDayProps) => {
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            opacity: fadeIn(10, 10),
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            style={{
              width: '80px',
              height: '60px',
              fill: color,
            }}
          >
            <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
          </svg>
        </div>

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
          {eventVenue}
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
