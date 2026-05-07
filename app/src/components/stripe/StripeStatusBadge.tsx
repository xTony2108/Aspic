interface Props {
  status: "pending" | "restricted" | "active";
}

export const StripeStatusBadge = ({ status }: Props) => {
  const styles = {
    active: "bg-green-100 text-green-700 border-green-200",

    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",

    restricted: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div
      className={`
        px-3 py-1 rounded-full border text-sm w-fit
        ${styles[status]}
      `}
    >
      Stripe: {status}
    </div>
  );
};
