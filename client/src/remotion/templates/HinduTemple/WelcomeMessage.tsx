import { AbsoluteFill } from 'remotion';

import './fonts/Text.css';
import type { WeddingProps } from '../types/wedding.types';
import { PoppingWordsAnimated } from '../../components/Effects/PoppingWordsAnimated';

export const WelcomeMessage = ({ welcomeMessage, color }: WeddingProps) => {
  return (
    <>
      <AbsoluteFill
        style={{
          color: '#2b2b2b',
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
            // fontFamily: 'Dancing Script',
            fontSize: '4rem',
            maxWidth: '850px',
            marginTop: '-10rem',
            letterSpacing: '3.5px',
            fontWeight: 900,
            textTransform: 'uppercase',
          }}
        >
          <PoppingWordsAnimated welcomeMessage={`${welcomeMessage}`} color={color} />
        </div>
      </AbsoluteFill>
    </>
  );
};
