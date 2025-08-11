import React from "react";

export function FilmReelLoader({ size = 160 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="mx-auto text-blue-500 dark:text-blue-400">
      <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="filmClip">
            <rect x="10" y="25" width="100" height="70" rx="8" />
          </clipPath>

          {/* moving shine gradient */}
          <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* outer rounded frame */}
        <rect x="8" y="23" width="104" height="74" rx="10" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeOpacity="0.15" />

        {/* perforations (left) */}
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={i} x={14} y={32 + i * 14} width="6" height="8" rx="1" fill="currentColor" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </rect>
        ))}

        {/* perforations (right) */}
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={i} x={100} y={32 + i * 14} width="6" height="8" rx="1" fill="currentColor" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.5;0.15" dur="2s" begin={`${0.4 + i * 0.2}s`} repeatCount="indefinite" />
          </rect>
        ))}

        {/* moving frames */}
        <g clipPath="url(#filmClip)">
          <g className="film-frames">
            {Array.from({ length: 10 }).map((_, i) => (
              <rect key={i} x={10 + i * 22} y={30} width="18" height="62" rx="4" fill="currentColor" opacity="0.08" />
            ))}
          </g>
          {/* shine sweep */}
          <rect x="10" y="25" width="100" height="70" fill="url(#shine)" className="shine" />
        </g>

        <style>{`
          @keyframes slideFrames {
            from { transform: translateX(0); }
            to { transform: translateX(-110px); }
          }
          @keyframes shineMove {
            from { transform: translateX(-100%); }
            to { transform: translateX(100%); }
          }
          .film-frames {
            transform-origin: 0 0;
            animation: slideFrames 3.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          .shine {
            animation: shineMove 2.5s ease-in-out infinite;
          }
        `}</style>
      </svg>
    </div>
  );
}
