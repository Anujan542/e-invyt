import { useCurrentFrame } from "remotion";

const floatAmplitude = 10;
const floatFrequency = 0.05;

interface FloatingProps {
  text: string;
}

export const FloatingTitle = ({ text }: FloatingProps) => {
  const frame = useCurrentFrame();
  const title = text;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontSize: "3rem",
        fontWeight: "bold",
        fontFamily: "Playfair Display, serif",
        marginBottom: "2rem",
      }}
    >
      {title.split("").map((letter, i) => {
        const offset = i * 10;
        const translateY =
          Math.sin((frame + offset) * floatFrequency) * floatAmplitude;

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${translateY}px)`,
              transition: "transform 0.1s",
              marginRight: letter === " " ? "0.5rem" : "0.1rem",
            }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};
