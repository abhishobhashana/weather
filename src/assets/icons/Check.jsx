import React from "react";
import { UseModeChecker } from "../../utils/useModeChecker";

export default function check() {
  const mode = UseModeChecker();

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2207_23125)">
        <path
          d="M7.68676 20.7271C8.19067 20.7271 8.58911 20.5044 8.87036 20.0708L19.9445 2.6333C20.1555 2.29346 20.2375 2.03565 20.2375 1.76612C20.2375 1.12158 19.8156 0.699707 19.1711 0.699707C18.7023 0.699707 18.4445 0.852051 18.1633 1.29737L7.63989 18.0669L2.17895 10.9185C1.88598 10.5083 1.59302 10.3443 1.17114 10.3443C0.503174 10.3443 0.0461426 10.8013 0.0461426 11.4458C0.0461426 11.7154 0.163331 12.0201 0.385987 12.3013L6.46802 20.0474C6.81958 20.5044 7.18286 20.7271 7.68676 20.7271Z"
          fill={mode ? "rgba(255, 255, 255, 1)" : "rgba(44, 44, 46, 1)"}
        />
      </g>
      <defs>
        <clipPath id="clip0_2207_23125">
          <rect
            width="20.1914"
            height="20.6836"
            fill="white"
            transform="translate(0.0461426 0.043457)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
