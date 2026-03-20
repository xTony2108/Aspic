import { useEffect, useState } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useAuthStore } from "../store";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuthStore((s) => s.accessToken);
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const pathname = router.state.location.pathname;

    const verifyRefreshToken = async () => {
      try {
        const newToken = await refresh();

        if (newToken && pathname.startsWith("/admin")) {
          navigate({ to: "/dashboard", replace: true });
        }
      } catch (error) {
        if (
          isAxiosError(error) &&
          error.status === 401 &&
          !pathname.startsWith("/admin")
        ) {
          navigate({ to: "/admin", replace: true });
        }
      } finally {
        setIsLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return isLoading ? <>Caricamento...</> : <Outlet />;
};
