import React from 'react';

export default function SablengLogo({ className = "w-12 h-12", withBackground = true }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_20px_rgba(0,180,216,0.35)]"
      >
        <defs>
          {/* Top Wing Gradient: Red-Orange to Golden Yellow */}
          <linearGradient id="sablengOrange" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA384D" />
            <stop offset="40%" stopColor="#FF5E36" />
            <stop offset="80%" stopColor="#FFAA00" />
            <stop offset="100%" stopColor="#FFD200" />
          </linearGradient>

          {/* Cyan Wing / Upper S Gradient */}
          <linearGradient id="sablengCyan" x1="0%" y1="50%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0077B6" />
            <stop offset="40%" stopColor="#00B4D8" />
            <stop offset="100%" stopColor="#48CAE4" />
          </linearGradient>

          {/* Central S Body Gradient */}
          <linearGradient id="sablengCenter" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#0096C7" />
            <stop offset="50%" stopColor="#00B4D8" />
            <stop offset="100%" stopColor="#023E8A" />
          </linearGradient>

          {/* Lower Tail Layer 1 Gradient */}
          <linearGradient id="sablengTail1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0077B6" />
            <stop offset="100%" stopColor="#03045E" />
          </linearGradient>

          {/* Lower Tail Layer 2 Gradient (Deep Dark Blue) */}
          <linearGradient id="sablengTail2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#023E8A" />
            <stop offset="100%" stopColor="#0A1128" />
          </linearGradient>

          {/* Subtle Glow Filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Optional Dark circular container */}
        {withBackground && (
          <rect
            width="200"
            height="200"
            rx="45"
            fill="#08090D"
            stroke="#1E232F"
            strokeWidth="3"
          />
        )}

        {/* --- Top Flame Wing (Orange-Red Gradient) --- */}
        <path
          d="M 98 44 C 114 41 138 46 156 36 C 146 44 135 50 120 54 C 102 59 90 68 85 81 C 80 65 85 47 98 44 Z"
          fill="url(#sablengOrange)"
        />

        {/* --- Second Feather / Wing Underneath (Cyan tip) --- */}
        <path
          d="M 104 62 C 120 60 138 61 150 56 C 140 64 126 69 110 71 C 99 72 90 77 86 85 C 88 74 95 64 104 62 Z"
          fill="url(#sablengCyan)"
        />

        {/* --- Main Stylized "S" Spine & Flow --- */}
        {/* Top Arc of S looping back */}
        <path
          d="M 85 80 C 80 97 88 112 105 117 C 122 122 135 129 133 145 C 130 162 110 171 90 168 C 105 166 118 158 118 147 C 118 135 106 130 94 124 C 77 116 70 100 75 84 C 77 78 81 74 85 80 Z"
          fill="url(#sablengCenter)"
        />

        {/* Inner swoop of the S head */}
        <path
          d="M 103 89 C 120 89 132 99 126 109 C 120 118 108 120 95 116 C 85 113 80 102 85 93 C 89 87 96 89 103 89 Z"
          fill="url(#sablengCyan)"
          opacity="0.95"
        />

        {/* --- Lower Ribbon Tail Layers (Waves) --- */}
        {/* Middle Tail Wave */}
        <path
          d="M 125 137 C 116 150 98 160 76 166 C 96 163 115 153 124 140 C 126 137 127 135 125 137 Z"
          fill="url(#sablengTail1)"
        />

        {/* Bottommost Swoop Wave 1 */}
        <path
          d="M 116 151 C 100 166 80 173 58 178 C 80 173 103 164 118 149 C 119 148 118 150 116 151 Z"
          fill="url(#sablengTail1)"
        />

        {/* Bottommost Swoop Wave 2 (Deep Navy Base) */}
        <path
          d="M 105 163 C 88 176 68 183 48 188 C 70 182 92 173 106 161 C 107 160 106 162 105 163 Z"
          fill="url(#sablengTail2)"
        />
      </svg>
    </div>
  );
}
