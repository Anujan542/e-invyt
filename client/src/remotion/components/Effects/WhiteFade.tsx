import { ReactNode } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type WhiteFadeProps = {
  type: string;
  duration: number;
  children: ReactNode;
};

export const WhiteFadeTransition = ({
  type,
  duration,
  children,
}: WhiteFadeProps) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const firstFrame = videoConfig.durationInFrames - duration;

  const progress =
    type === "in"
      ? interpolate(frame, [-10, duration], [0, 100], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        })
      : interpolate(
          frame,
          [firstFrame, videoConfig.durationInFrames - 1],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

  return (
    <AbsoluteFill
      style={{
        opacity: progress,
        background: "white",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
