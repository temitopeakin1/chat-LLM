
interface SmileyIconProps {
    className?: string;
}

const SmileyIcon: React.FC<SmileyIconProps> = ({ className }) => {
  return (
    <svg
    className={className}
      width="31"
      height="30"
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.1667 17.6667C10.1667 17.6667 12.1667 20.3333 15.5 20.3333C18.8333 20.3333 20.8333 17.6667 20.8333 17.6667M11.5 11H11.5133M19.5 11H19.5133M28.8333 15C28.8333 22.3638 22.8638 28.3333 15.5 28.3333C8.1362 28.3333 2.16666 22.3638 2.16666 15C2.16666 7.6362 8.1362 1.66667 15.5 1.66667C22.8638 1.66667 28.8333 7.6362 28.8333 15Z"
        stroke="#086224"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SmileyIcon;
