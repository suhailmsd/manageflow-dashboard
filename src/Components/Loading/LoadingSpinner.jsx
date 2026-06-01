import { FaSpinner } from 'react-icons/fa';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
  <FaSpinner className="animate-spin text-3xl" />
</div>
  )
}
