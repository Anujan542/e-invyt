import { interpolate, useCurrentFrame,  } from 'remotion';
import React from 'react';

type FadeInOutProps = {
  inDuration: number;
  outDuration: number;
  totalDuration: number;
  children: React.ReactNode;
};

 export const FadeInOut: React.FC<FadeInOutProps> = ({
  inDuration,
  outDuration,
  totalDuration,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, inDuration, totalDuration - outDuration, totalDuration],
    [0, 1, 1, 0]
  );

  return <div style={{ opacity }}>{children}</div>;
};
