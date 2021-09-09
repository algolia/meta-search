export function LoadingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <circle
        cx="50"
        cy="50"
        fill="none"
        r="35"
        stroke="currentColor"
        strokeDasharray="164.93361431346415 56.97787143782138"
        strokeWidth="6"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;90 50 50;180 50 50;360 50 50"
          keyTimes="0;0.40;0.65;1"
        />
      </circle>
    </svg>
  );
}
