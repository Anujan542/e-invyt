// TwinkleSpark.tsx
import { useCurrentFrame, interpolate } from 'remotion';

export const TwinkleSpark: React.FC<{
  x: number;
  y: number;
  delay: number;
}> = ({ x, y, delay }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;

  const opacity = interpolate(localFrame, [0, 5, 15], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(localFrame, [0, 5, 15], [0.3, 1.2, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <circle
      cx={x}
      cy={y}
      r="1.5"
      fill="white"
      stroke="gold"
      strokeWidth="0.3"
      opacity={opacity}
      transform={`scale(${scale})`}
    />
  );
};
