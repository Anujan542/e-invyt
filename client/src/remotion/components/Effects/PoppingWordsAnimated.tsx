import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const PoppingWordsAnimated: React.FC<{
  welcomeMessage: string;
  color?: string;
}> = ({ welcomeMessage, color = '#2b2b2b' }) => {
  const words = welcomeMessage.split(' ');
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        color,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          fontSize: '5rem',
          maxWidth: '850px',
          marginTop: '-10rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          // letterSpacing: '3.5px',
          gap: '1rem',
        }}
      >
        {words.map((word, wordIndex) => {
          const wordDelay = wordIndex * 5;

          const wordPop = spring({
            frame: frame - wordDelay,
            fps,
            config: {
              damping: 8,
              stiffness: 100,
              mass: 0.2,
            },
          });

          return (
            <span
              key={wordIndex}
              style={{
                display: 'inline-block',
                transform: `scale(${wordPop})`,
              }}
            >
              {[...word].map((char, charIndex) => {
                const charDelay = wordDelay + charIndex * 2;

                const opacity = interpolate(frame - charDelay, [0, 5], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });

                return (
                  <span
                    key={charIndex}
                    style={{
                      display: 'inline-block',
                      opacity,
                      transition: 'opacity 0.3s',
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
