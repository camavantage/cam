interface Props {
  className?: string;
}

const FlagDrcIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 800 600"
      width="800"
      height="600"
      className={className}
    >
      <rect width="800" height="600" x="0" y="0" fill="#007fff" />
      <path
        d="m 36,120 84,0 26,-84 26,84 84,0 -68,52 26,84 -68,-52 -68,52 26,-84 -68,-52 z M 750,0 0,450 0,600 0,600 50,600 800,150 800,0 750,0"
        fill="#f7d618"
      />
      <path d="M 800,0 0,480 0,600 0,600 0,600 800,120 800,0" fill="#ce1021" />
    </svg>
  );
};

export default FlagDrcIcon;
