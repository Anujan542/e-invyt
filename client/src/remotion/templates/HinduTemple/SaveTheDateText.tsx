import { useCurrentFrame,  interpolate } from 'remotion';
import type { SaveDayProps } from '../types/wedding.types';
import { AnimatedEventDate } from '../../components/Effects/AnimatedEventDate';

export const EventDetails = ({ color, eventDate, eventVenue }: SaveDayProps) => {
  const frame = useCurrentFrame();
  const fadeIn = (start: number, duration: number) =>
    interpolate(frame, [start, start + duration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  return (
    <>
      {/* Top Calendar Icon + Date */}
      <div
        style={{
          fontFamily: 'Dancing Script',
          fontSize: '4rem',
          maxWidth: '850px',
          letterSpacing: '3.5px',
          fontWeight: 900,
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: fadeIn(5, 10),
        }}
      >
        {/* Calendar Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          style={{
            width: '80px',
            height: '80px',
            marginBottom: '1rem',
            fill: color,
          }}
        >
          <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z" />
        </svg>

        <AnimatedEventDate text={eventDate!} color={color} />
      </div>

      {/* Heart SVG */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem',
          opacity: fadeIn(20, 10),
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          style={{
            width: '80px',
            height: '60px',
            fill: color,
          }}
        >
          <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
        </svg>
      </div>

      {/* Venue Text */}
      <div
        style={{
          opacity: fadeIn(30, 10),
          fontSize: '3rem',
          fontFamily: 'Roboto',
          color: color,
          width: '800px',
          textTransform: 'uppercase',
          letterSpacing: '0.5rem',
          fontWeight: 900,
          textAlign: 'center',
        }}
      >
        {eventVenue}
      </div>
    </>
  );
};
