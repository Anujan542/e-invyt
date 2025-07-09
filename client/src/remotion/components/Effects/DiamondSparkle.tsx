// DiamondSparkle.tsx
export const DiamondSparkle: React.FC<React.HTMLAttributes<SVGElement>> = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="gold"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 2L15 12L12 22L9 12L12 2Z" />
    <path d="M2 12L12 15L22 12L12 9L2 12Z" />
  </svg>
);
