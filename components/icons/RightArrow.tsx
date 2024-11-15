import * as React from 'react'
const RightArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path stroke="url(#b)" d="M.684 8.373h14" />
      <path stroke="url(#c)" d="m10.684 4.373 4 4-4 4" />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={7.684}
        x2={7.684}
        y1={9.373}
        y2={8.373}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EBEBFC" />
        <stop offset={1} stopColor="#A2A3AE" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={12.684}
        x2={12.684}
        y1={12.373}
        y2={4.373}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#EBEBFC" />
        <stop offset={1} stopColor="#A2A3AE" />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M.017.373h16v16h-16z" />
      </clipPath>
    </defs>
  </svg>
)
export default RightArrow
