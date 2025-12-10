type LogoProps = { className?: string };

const LogoDark = ({ className }: LogoProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="ZipTrip logo (dark)"
  >
    <title>ZipTrip</title>
    <path
      d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"
      fill="#0EA5A4"
    />
    <path
      d="M11.2 7.8L8.8 13h2.6l-.8 4 4.4-6H13l.2-3.2-2-0z"
      fill="#FFD24D"
    />
  </svg>
);

export default LogoDark;
