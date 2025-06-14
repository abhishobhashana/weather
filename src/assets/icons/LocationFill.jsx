import React from "react";
import { UseModeChecker } from "../../utils/useModeChecker";

export default function LocationFill() {
  const mode = UseModeChecker();

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.54974 11.7947L10.0927 11.8298C10.2685 11.8298 10.3271 11.8884 10.3271 12.0642L10.3505 20.5369C10.3505 22.283 12.4482 22.6931 13.2333 20.9939L21.8935 2.37277C22.6786 0.661837 21.331 -0.463163 19.6904 0.298556L0.9638 8.98215C-0.5362 9.67355 -0.243231 11.783 1.54974 11.7947Z"
        fill={mode ? "rgba(235, 235, 245, 0.6)" : "rgba(60, 60, 67, 0.60)"}
      />
    </svg>
  );
}
