

interface PlusIconProps {
  className?: string; // Define className prop as optional
}


const PlusIcon: React.FC<PlusIconProps> = ({ className }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99992 3.33334V12.6667M3.33325 8.00001H12.6666"
        stroke="#4C4E53"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default PlusIcon;
