import { FaSpinner } from "react-icons/fa";
import useModal from "../../hooks/useModal";

export default function LoadingSpinner() {
  const {isModalOpen} = useModal();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <FaSpinner className={`animate-spin text-3xl rounded-full text-bold text-black dark:text-white ${isModalOpen && 'text-white'}`} />
    </div>
  );
}
