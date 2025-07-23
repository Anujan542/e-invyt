import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import type { SaveDayProps } from '../types/wedding.types';
import { AnimatedEventDate } from '../../components/Effects/AnimatedEventDate';

export const SaveTheDateText = ({ color, eventDate }: SaveDayProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
  frame,
  fps,
  from: 0,
  to: 1,
  config: {
    damping: 8,
    mass: 0.5,
    stiffness: 120,
  },
});

// Optional subtle bounce in opacity
const poppingOpacity = interpolate(pop, [0, 1], [0, 1]);


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
        fontWeight: 'bold',
        fontSize: '4rem',
        color: color,
        textTransform: 'uppercase',
        marginBottom: '10rem',
        transform: `scale(${pop})`,
        opacity: poppingOpacity,
      }}
      >
       <AnimatedEventDate text={eventDate} color={color} />

        {/* {eventDate} */}
      </div>
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
        SAVE THE DATE
      </div>
    </>
  );
};
