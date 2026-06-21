export default function NavButton({ buttonIcon, buttonName }) {
  return (
    <button className="flex gap-2 items-center py-2">
      <div className="group-hover:translate-x-1 transition duration-300">
        {buttonIcon}
      </div>
      <span className="">{buttonName}</span>
    </button>
  );
}
