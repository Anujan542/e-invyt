import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

import './fonts/Text.css';
import type { WeddingProps } from '../types/wedding.types';
// import { AnimatedEventDate } from '../../components/Effects/AnimatedEventDate';

export const EventDate = ({
  // groomName,
  // brideName,
  // groomFamilyInfo,
  // brideFamilyInfo,
  eventDate,
  // eventVenue,
  // welcomeMessage,
  color,
}: WeddingProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // const fadeIn = (start: number, duration: number) =>
  //   interpolate(frame, [start, start + duration], [0, 1], {
  //     extrapolateLeft: 'clamp',
  //     extrapolateRight: 'clamp',
  //   });

  // const slideIn = (start: number, duration: number, from: 'left' | 'right') => {
  //   const direction = from === 'left' ? -100 : 100;
  //   return interpolate(frame, [start, start + duration], [direction, 0], {
  //     extrapolateLeft: 'clamp',
  //     extrapolateRight: 'clamp',
  //   });
  // };

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // console.log("eventDate",eventDate)
  const parts = eventDate!.split(' | ').map((part) => part.trim());

  // Step 2: Destructure into variables
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
        {/* <div
          style={{
            opacity: fadeIn(15, 10),
            fontSize: '2.5rem',
            maxWidth: '850px',
            marginBottom: '8rem',
            marginTop: '3rem',
            color: color,
            letterSpacing: '1.5px',
            fontWeight: 'bolder',
            textTransform: 'uppercase',
          }}
        >
          {welcomeMessage}
        </div> */}

        {/* <div
          style={{
            opacity: fadeIn(25, 10),
            transform: `translateX(${slideIn(25, 15, 'left')}px)`,
            fontSize: '10rem',
            fontFamily: 'Great Vibes',
            marginTop: '2rem',
            marginBottom: '2rem',
            color: color,
            fontWeight: 'bolder',
          }}
        >
          {groomName}
        </div>
        <div
          style={{
            opacity: fadeIn(30, 10),
            fontSize: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2rem',
            fontWeight: 'bolder',
            color: color,
          }}
        >
          {groomFamilyInfo}
        </div> */}
        {/* <div
          style={{
            opacity: fadeIn(35, 10),
            transform: `translateX(${slideIn(35, 15, 'right')}px)`,
            fontSize: '10rem',
            fontFamily: 'Great Vibes',
            marginTop: '3rem',
            fontWeight: 'bolder',
            color: color,
          }}
        >
          &
        </div> */}
        {/* <div
          style={{
            opacity: fadeIn(40, 10),
            transform: `translateX(${slideIn(40, 15, 'right')}px)`,
            fontSize: '10rem',
            fontFamily: 'Great Vibes',
            marginTop: '1rem',
            fontWeight: 'bolder',
            color: color,
          }}
        >
          {brideName}
        </div> */}
        {/* <div
          style={{
            opacity: fadeIn(45, 10),
            fontSize: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2rem',
            color: color,
            fontWeight: 'bolder',
          }}
        >
          {brideFamilyInfo}
        </div> */}

        {/* <div
          style={{
            marginTop: '5rem',
            fontSize: '6rem',
            color: color,
            textTransform: 'uppercase',
            fontWeight: 'lighter',
          }}
        > */}
          {/* {eventDate!.split('').map((char, index) => {
            const delay = index * 2;
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
          })} */}
          {/* {eventDate} */}
        {/* </div> */}
        {/* <div
          style={{
            opacity: fadeIn(80, 10),
            marginTop: '5rem',
            fontSize: '2.5rem',
            color: color,
            textTransform: 'uppercase',
            letterSpacing: '0.2rem',
            fontWeight: 'bolder',
          }}
        >
          {eventVenue}
        </div> */}
      </AbsoluteFill>
    </>
  );
};
