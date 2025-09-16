interface BackIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const BackIcon = ({ 
  width = 38, 
  height = 38, 
  className = "" 
}: BackIconProps) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 38 38" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M22.1665 12.666L15.8332 18.9993L22.1665 25.3327" 
        stroke="white" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};
