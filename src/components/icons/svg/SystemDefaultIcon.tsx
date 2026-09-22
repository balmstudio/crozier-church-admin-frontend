import type { IconProps } from "../@type";

const SystemDefaultIcon = ({ size = 11, width, height, className = "" }: IconProps) => (
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
      d="M9.7902 0H0.97902C0.719606 0.000791363 0.471039 0.106402 0.287604 0.293767C0.10417 0.481133 0.000774761 0.735027 0 1V7C0.000774761 7.26497 0.10417 7.51887 0.287604 7.70623C0.471039 7.8936 0.719606 7.99921 0.97902 8H4.40559V9H3.42657V10H7.34265V9H6.36363V8H9.7902C10.0496 7.99921 10.2982 7.8936 10.4816 7.70623C10.6651 7.51887 10.7684 7.26497 10.7692 7V1C10.7684 0.735027 10.6651 0.481133 10.4816 0.293767C10.2982 0.106402 10.0496 0.000791363 9.7902 0ZM4.7737 5.833L2.44853 3.458L3.1407 2.7515L4.7737 4.4195L7.62999 1.5015L8.32265 2.209L4.7737 5.833Z"
      fill="currentColor"
    />
  </svg>
);

export default SystemDefaultIcon;
