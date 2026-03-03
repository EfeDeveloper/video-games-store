import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <FiAlertCircle className="mb-4 text-red-500" size={64} />
      <h3 className="mb-2 font-bold text-white text-xl">
        Oops! Something went wrong
      </h3>
      <p className="mb-6 max-w-md text-gray-400 text-center">
        {message || 'Failed to load games. Please try again later.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold text-white transition-colors"
        >
          <FiRefreshCw size={20} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
