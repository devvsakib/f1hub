import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error); // Log the error to the console for debugging

  let errorMessage = 'An unexpected error occurred.';
  let errorStatus = 500; // Default to internal server error

  if (error && typeof error === 'object' && 'statusText' in error && 'status' in error) {
    errorMessage = error.statusText || errorMessage;
    errorStatus = error.status || errorStatus;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 -z-40">
      <h1 className="text-4xl font-bold mb-4 text-red-600">Oops!</h1>
      <p className="text-lg mb-2">Something went wrong.</p>
      <p className="text-lg mb-2">
        {errorMessage} (Status: {errorStatus})
      </p>
      <p className="text-sm text-gray-400">
        Please try again later or contact support.
      </p>
      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;