import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type AnimationStyle = 'fadeSlideUp' | 'bounce' | 'clipReveal' | 'staggered' | 'fadeScale';

type AnimatedTextProps = {
  text: string;
  animationStyle?: AnimationStyle;
  fontSize?: number;
  color?: string;
  delay?: number;
  fontWeight?: string | number;
  lineHeight?: number;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  animationStyle = 'fadeSlideUp',
  fontSize = 60,
  color = '#000',
  delay = 0,
  fontWeight = 'bold',
  lineHeight = 1.2,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Split lines for multi-line support
  const lines = text.split('\n');

  const getLineStyle = (i: number): React.CSSProperties => {
    const localDelay = delay + i * 5; // slight stagger for lines
    const style: React.CSSProperties = {
      fontSize,
      color,
      fontWeight,
      lineHeight: `${lineHeight}`,
      display: 'block',
      whiteSpace: 'pre',
    };

    if (animationStyle === 'fadeSlideUp') {
      const opacity = interpolate(frame, [localDelay, localDelay + 20], [0, 1], {
        extrapolateRight: 'clamp',
      });
      const y = interpolate(frame, [localDelay, localDelay + 20], [20, 0], {
        extrapolateRight: 'clamp',
      });
      style.opacity = opacity;
      style.transform = `translateY(${y}px)`;
    }

    if (animationStyle === 'bounce') {
      const scale = spring({
        fps,
        frame: frame - localDelay,
        from: 0,
        to: 1,
        config: {damping: 8, mass: 0.5, stiffness: 100},
      });
      style.transform = `scale(${scale})`;
    }

    if (animationStyle === 'clipReveal') {
      const clip = interpolate(frame, [localDelay, localDelay + 30], [0, 100], {
        extrapolateRight: 'clamp',
      });
      style.clipPath = `inset(0% ${100 - clip}% 0% 0%)`;
      style.whiteSpace = 'nowrap';
    }

    if (animationStyle === 'fadeScale') {
      const opacity = interpolate(frame, [localDelay, localDelay + 20], [0, 1], {
        extrapolateRight: 'clamp',
      });
      const scale = interpolate(frame, [localDelay, localDelay + 20], [0.8, 1], {
        extrapolateRight: 'clamp',
      });
      style.opacity = opacity;
      style.transform = `scale(${scale})`;
    }

    return style;
  };

  if (animationStyle === 'staggered') {
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 5}}>
        {text.split('').map((char, i) => {
          const localDelay = delay + i * 2;
          const opacity = interpolate(frame, [localDelay, localDelay + 10], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const y = interpolate(frame, [localDelay, localDelay + 10], [20, 0], {
            extrapolateRight: 'clamp',
          });

          return (
            <span
              key={i}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                fontSize,
                fontWeight,
                color,
                lineHeight,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {lines.map((line, i) => (
        <span key={i} style={getLineStyle(i)}>
          {line}
        </span>
      ))}
    </div>
  );
};


// <AnimatedText
//   text={`Welcome to\nE-Invyt`}
//   animationStyle="fadeScale"
//   fontSize={70}
//   color="#8e44ad"
//   delay={10}
// />
