export const LoadingSpinner = () => {
  return (
    <div
      className="size-12 animate-spin rounded-full border-6 border-t-transparent border-blue-500"
      role="status"
    >
        <span className="sr-only">Loading...</span>
    </div>
  );
};
