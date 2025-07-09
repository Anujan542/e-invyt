import { useCurrentFrame, spring, useVideoConfig } from "remotion";

interface RippleTitleProps {
  text: string;
  fontSize: string;
}

export const RippleTitle = ({text,fontSize}:RippleTitleProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();


  return (
    <div
      style={{
        fontSize: `${fontSize}rem`,
        fontFamily: "Georgia, serif",
        letterSpacing: "1rem",
        marginBottom: "100rem",
        fontWeight: "bolder",
        color: "#000814",
      
      }}
    >
      {text.split("").map((char, index) => {
        const delay = index * 2;
        const animation = spring({
          frame: frame - delay,
          fps,
          config: {
            damping: 5,
            mass: 0.5,
            stiffness: 100,
          },
        });

        const opacity = frame > delay ? 1 : 0;

        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              transform: `translateY(${(1 - animation) * 30}px)`,
              opacity,
              marginRight: char === " " ? "0.5rem" : "0.2rem",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
