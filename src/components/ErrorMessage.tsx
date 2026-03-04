import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <FiAlertCircle className="mb-4 text-red-400 animate-bounce" size={64} />
      <h3 className="bg-clip-text bg-gradient-to-r from-red-400 to-neon mb-2 font-bold text-transparent text-xl">
        Oops! Something went wrong
      </h3>
      <p className="mb-6 max-w-md text-gray-400 text-center">
        {message || 'Failed to load games. Please try again later.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-gradient-to-r from-primary hover:from-primary to-purple-600 hover:to-neon shadow-lg hover:shadow-glow-purple px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all"
        >
          <FiRefreshCw size={20} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
