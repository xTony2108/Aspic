export const StripeLoadingCard = () => {
  return (
    <div className="border border-border rounded-2xl p-6 bg-white animate-pulse lg:col-span-2">
      <div className="h-5 w-40 bg-gray-200 rounded" />
      <div className="mt-4 h-4 w-64 bg-gray-100 rounded mb-5" />
      <div className="border border-border bg-gray-200 rounded-xl p-4 h-18"></div>
      <div className="flex justify-end">
        <div className="mt-6 h-10 w-48 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
};
