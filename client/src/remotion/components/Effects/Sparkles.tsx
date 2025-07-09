import { useCurrentFrame, interpolate } from 'remotion';

export const RippleRings: React.FC = () => {
  const frame = useCurrentFrame();
  const ringCount = 10;

  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', pointerEvents: 'none' }}>
      {Array.from({ length: ringCount }).map((_, i) => {
        const delay = i * 20;
        const localFrame = frame - delay;

        const scale = interpolate(localFrame, [0, 60], [0.2, 1.5], {
          extrapolateRight: 'clamp',
        });

        const opacity = interpolate(localFrame, [0, 40, 60], [0.5, 0.2, 0], {
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '2px solid rgba(255, 215, 0, 0.5)', // soft gold
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};
