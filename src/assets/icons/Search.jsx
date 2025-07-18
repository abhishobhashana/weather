import React from "react";
import { UseModeChecker } from "../../utils/useModeChecker";

export default function Search() {
  const mode = UseModeChecker();

  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2207_33957)">
        <path
          d="M3.0127 11.4468C3.0127 16.603 7.208 20.7983 12.3643 20.7983C14.4033 20.7983 16.2666 20.1421 17.8018 19.0405L23.5674 24.8179C23.8369 25.0874 24.1885 25.2163 24.5635 25.2163C25.3604 25.2163 25.9111 24.6186 25.9111 23.8335C25.9111 23.4585 25.7705 23.1186 25.5244 22.8725L19.7939 17.1069C21.001 15.5366 21.7158 13.5796 21.7158 11.4468C21.7158 6.29052 17.5205 2.09521 12.3643 2.09521C7.208 2.09521 3.0127 6.29052 3.0127 11.4468ZM5.01661 11.4468C5.01661 7.39209 8.30958 4.09912 12.3643 4.09912C16.4189 4.09912 19.7119 7.39209 19.7119 11.4468C19.7119 15.5014 16.4189 18.7944 12.3643 18.7944C8.30958 18.7944 5.01661 15.5014 5.01661 11.4468Z"
          fill={mode ? "rgba(235, 235, 245, 0.6)" : "rgba(60, 60, 67, 0.60)"}
        />
      </g>
      <defs>
        <clipPath id="clip0_2207_33957">
          <rect
            width="22.8984"
            height="23.1211"
            fill="white"
            transform="translate(3.0127 2.09521)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
