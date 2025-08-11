import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

import './fonts/Text.css';
import type { WeddingProps } from '../types/wedding.types';
import { format } from 'date-fns';

export const EventDate = ({ eventDate, color }: WeddingProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cleanedDate = eventDate!.replace(/\s*\|\s*/g, ' '); // "5 August 2025"

  const parsedDate = new Date(cleanedDate);

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const finalDate = format(parsedDate!, 'EEEE | d | MMMM | yyyy');

  const parts = finalDate!.split(' | ').map((part) => part.trim());

  const [day, date, month, year] = parts;

  return (
    <>
      <AbsoluteFill
        style={{
          color: '#2b2b2b',
          fontFamily: 'Georgia, serif',
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
            fontFamily: 'Georgia, serif',
            textAlign: 'center',
            color: color,
            opacity,
          }}
        >
          <div style={{ fontSize: '8rem', fontWeight: 'bold', textTransform: 'capitalize' }}>
            {month!.split('').map((char, index) => {
              const delay = index * 5;
              const pop = spring({
                frame: Math.max(0, frame - delay),
                fps,
                from: 0,
                to: 1,
                config: {
                  damping: 8,
                  mass: 0.5,
                  stiffness: 100,
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
            {/* {month} */}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 30,
              marginTop: 5,
              fontSize: '5rem',
            }}
          >
            <div>
              <div
                style={{
                  borderTop: '2px solid #7A1F0F',
                  borderBottom: '2px solid #7A1F0F',
                  padding: '4px 8px',
                  fontSize: '4rem',
                  fontWeight: 'bold',
                }}
              >
                {day}
              </div>
            </div>
            <div style={{ fontSize: '10rem', fontWeight: 'bold', color: '#B97A00' }}>{date}</div>
            <div>
              <div
                style={{
                  padding: '4px 8px',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                }}
              >
                | {year}
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
};
