interface CodeIconProps {
    className?: string; 
  }


const CodeIcon: React.FC<CodeIconProps> = ({ className }) => {
  return (
    <svg
    className={className}
      width="30"
      height="20"
      viewBox="0 0 30 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.3333 18L28.3333 10L20.3333 2M9.66666 2L1.66666 10L9.66666 18"
        stroke="#086224"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CodeIcon;
