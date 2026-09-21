import { useSuspenseQuery } from "@tanstack/react-query";
import { createGetUserDataQueryOptions } from "../../../api/admin/createGetUserDataQueryOptions";

export const ProfessionalName = () => {
  const {
    data: { userData },
  } = useSuspenseQuery(createGetUserDataQueryOptions());
  return (
    <div className="bg-white border border-border rounded-2xl p-5">
      <h3 className="font-garamond text-xl font-semibold mb-4">
        Professionista
      </h3>
      <div className="w-full px-3.5 py-2.5 border border-border rounded-xl text-[14px] outline-none focus:border-primary transition-all appearance-none">
        {`${userData.firstName} ${userData.lastName}`}
      </div>
    </div>
  );
};
