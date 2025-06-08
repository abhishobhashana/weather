import React from "react";
import { UseModeChecker } from "../../utils/useModeChecker";

export default function Pin() {
  const mode = UseModeChecker();

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2207_35334)">
        <path
          d="M10.0525 5.51319C10.0525 7.57569 11.447 9.29834 13.3572 9.7788V20.6538C13.3572 24.1108 13.9783 25.9975 14.447 25.9975C14.9275 25.9975 15.5369 24.1225 15.5369 20.6538V9.7788C17.447 9.31005 18.8533 7.57569 18.8533 5.51319C18.8533 3.0874 16.8962 1.09521 14.447 1.09521C12.0095 1.09521 10.0525 3.0874 10.0525 5.51319Z"
          fill={mode ? "rgba(255, 255, 255, 1)" : "rgba(44, 44, 46, 1)"}
        />
        <path
          d="M13.1931 5.75928C12.3845 5.75928 11.6814 5.05616 11.6814 4.23584C11.6814 3.42725 12.3845 2.73584 13.1931 2.73584C14.0134 2.73584 14.6931 3.42725 14.6931 4.23584C14.6931 5.05616 14.0134 5.75928 13.1931 5.75928Z"
          fill={mode ? "rgba(255, 255, 255, 1)" : "rgba(44, 44, 46, 1)"}
        />
      </g>
      <defs>
        <clipPath id="clip0_2207_35334">
          <rect
            width="8.80078"
            height="25.7461"
            fill={mode ? "rgba(255, 255, 255, 1)" : "rgba(44, 44, 46, 1)"}
            transform="translate(10.0525 1.09521)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
