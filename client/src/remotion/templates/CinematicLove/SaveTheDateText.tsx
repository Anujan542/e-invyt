import { useCurrentFrame, spring, useVideoConfig } from 'remotion';
import type { SaveDayProps } from '../types/wedding.types';

export const SaveTheDateText = ({ color, eventDate }: SaveDayProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
          marginTop: '-38rem',
          marginBottom: '40rem',
          fontWeight: 'bolder',
        }}
      >
        SAVE THE DATE
      </div>
      <div
        style={{
          marginTop: '-10rem',
          fontWeight: 'bold',
          fontSize: '4rem',
          color: color,
          textTransform: 'uppercase',
        }}
      >
        {eventDate}
      </div>
    </>
  );
};
