import type { IconProps } from "../@type";

const CustomRoleIcon = ({ size = 11, width, height, className = "" }: IconProps) => (
  <svg
    width={width ?? size}
    height={height ?? size}
    viewBox="0 0 11 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10.7294 1.03758C10.7294 1.03758 10.9006 0.542101 10.533 0.195268C10.1971 -0.126792 9.7598 0.0466251 9.7598 0.0466251C9.37321 0.232429 6.10938 2.19575 4.89891 3.49638C4.35389 4.09095 3.59338 5.8437 4.20812 6.48162C4.79118 7.08858 6.71779 6.37633 7.2438 5.86228C8.54933 4.58643 10.5457 1.42157 10.7294 1.03758ZM0 9.75796C1.502 8.79178 0.92528 7.64599 2.04702 6.8842C2.63641 6.48162 3.45396 6.5002 3.99898 7.06381C4.39825 7.47877 4.50599 8.65553 3.89758 9.20674C2.90259 10.1048 1.36257 10.1667 0 9.75796Z"
      fill="currentColor"
    />
  </svg>
);

export default CustomRoleIcon;
