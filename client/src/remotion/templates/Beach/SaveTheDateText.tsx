import { useCurrentFrame, spring, useVideoConfig, } from 'remotion';
import type { SaveDayProps } from '../types/wedding.types';
// import { AnimatedEventDate } from '../../components/Effects/AnimatedEventDate';

export const SaveTheDateText = ({ color }: SaveDayProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // const pop = spring({
  //   frame,
  //   fps,
  //   from: 0,
  //   to: 1,
  //   config: {
  //     damping: 8,
  //     mass: 0.5,
  //     stiffness: 120,
  //   },
  // });

  // Optional subtle bounce in opacity
  // const poppingOpacity = interpolate(pop, [0, 1], [0, 1]);

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
          fontSize: '5rem',
          fontFamily: '',
          color: color,
          textAlign: 'center',
          transform: `scale(${scale})`,
          opacity,
          marginBottom: '20rem',
          fontWeight: 'bolder',
        }}
      >
        <div style={{ textAlign: 'center', color: color }}>
          <h1
            style={{
              fontSize: '14rem',
              fontFamily: 'serif',
              letterSpacing: 2,
              margin: 0,
            }}
          >
            SAVE
          </h1>
          <h2
            style={{
              fontSize: '10rem',
              fontFamily: '"Dancing Script", cursive',
              fontWeight: 400,
              margin: 0,
            }}
          >
            the
          </h2>
          <h1
            style={{
              fontSize: '14rem',
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
