import type { IconProps } from "../@type";

const AppGridIcon = ({ size = 16, width, height, className = "" }: IconProps) => (
  <svg
    width={width ?? size}
    height={height ?? size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {[0, 6, 12].flatMap((y) =>
      [0, 6, 12].map((x) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="0.8" fill="currentColor" />
      )),
    )}
  </svg>
);

export default AppGridIcon;
