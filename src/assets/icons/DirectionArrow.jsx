import React from "react";

export default function DirectionArrow({ fill = "", rotate = 0 }) {
  return (
    <svg
      width="63"
      height="119"
      viewBox="0 0 65 119"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)`, transformOrigin: "center" }}
    >
      <path
        d="M32.0091 0.153429C32.1236 -0.0513059 32.419 -0.0513059 32.5335 0.153429L39.0784 11.8556C39.1686 12.0167 39.0111 12.2035 38.8372 12.1417L33.2815 10.1544V30.5528H31.262V10.1544L25.7063 12.1417C25.5323 12.2039 25.3739 12.0169 25.4642 11.8556L32.0091 0.153429Z"
        fill="white"
      />
      <path
        d="M32.2715 108.885C35.0646 108.885 37.3291 111.149 37.3291 113.943C37.329 116.736 35.0645 119 32.2715 119C29.4783 119 27.214 116.736 27.2139 113.943C27.2139 111.149 29.4782 108.885 32.2715 108.885Z"
        fill="white"
      />
      <rect
        x="31.2627"
        y="12.9753"
        width="2.01934"
        height="95.9188"
        fill="white"
      />
      <g filter="url(#filter0_d_237_402)">
        <circle cx="32.2718" cy="57.8229" r="28.2708" fill={fill} />
      </g>
      <defs>
        <filter
          id="filter0_d_237_402"
          x="0.000976562"
          y="25.5521"
          width="64.5415"
          height="64.5416"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_237_402"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_237_402"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
