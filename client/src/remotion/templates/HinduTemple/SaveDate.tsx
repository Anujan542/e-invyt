import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { WeddingProps } from '../types/wedding.types';

const SaveDate = ({ color }: WeddingProps) => {
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
    <div>
      <div
        style={{
          fontSize: '5rem',
          color: color,
          textAlign: 'center',
          transform: `scale(${scale})`,
          opacity,
          // marginTop: '50rem',
          fontWeight: 'bolder',
        }}
      >
        SAVE THE DATE
      </div>
    </div>
  );
};

export default SaveDate;
