import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const AnimatedEventDate = ({ text, color }: { text: string; color: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        fontWeight: 'bold',
        fontSize: '4rem',
        color,
        textTransform: 'uppercase',
        marginBottom: '10rem',
        display: 'flex',
        gap: '0.3rem',
        justifyContent: 'center',
      }}
    >
      {text.split('').map((char, index) => {
        const delay = index * 4; // 4 frames delay between each character
        const pop = spring({
          frame: Math.max(0, frame - delay),
          fps,
          from: 0,
          to: 1,
          config: {
            damping: 8,
            mass: 0.5,
            stiffness: 120,
          },
        });

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              transform: `scale(${pop})`,
              opacity: pop,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
