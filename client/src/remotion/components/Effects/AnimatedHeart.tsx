import { useCurrentFrame, interpolate } from 'remotion';

interface HeartProps {
  color: string;
}

export const AnimatedHeart = ({ color }: HeartProps) => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const pulse = interpolate(frame, [60, 75, 90, 105, 120], [1, 1.05, 1, 1.05, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'extend',
  });

  const pathLength = 400;

  return (
    <svg
      viewBox="0 0 100 90"
      width="1100"
      height="1000"
      style={{
        marginBottom: '1.5rem',
        transform: `scale(${frame >= 60 ? pulse : 1})`,
        transition: 'transform 0.2s',
      }}
    >
      <path
        d="M10,30 
           C10,10 40,10 50,30 
           C60,10 90,10 90,30 
           C90,50 50,80 50,80 
           C50,80 10,50 10,30"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - drawProgress)}
      />
    </svg>
  );
};
