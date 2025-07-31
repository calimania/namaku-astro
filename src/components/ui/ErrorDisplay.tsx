import React from 'react';
import { IconAlertTriangle, IconReload } from '@tabler/icons-react';
import { Button } from './Button';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message = "Something went wrong.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-red-50 rounded-lg border border-red-200">
      <IconAlertTriangle className="w-16 h-16 text-red-400 mb-4" />
      <h3 className="text-xl font-semibold text-red-800 mb-2">Oops! An Error Occurred</h3>
      <p className="text-red-600 mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          <IconReload className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};
