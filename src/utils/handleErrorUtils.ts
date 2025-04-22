import errorMessages from './error.json';

interface ErrorMessages {
  [key: string]: string;
}

const errorMessagesMap: ErrorMessages = errorMessages;

const handleError = (error: string): string => {
  if (!error) return '';

  return errorMessagesMap[error] || 'Unknown error occurred';
};

export default handleError;
