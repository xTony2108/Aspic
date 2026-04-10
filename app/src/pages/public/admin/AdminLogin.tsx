import { useMutation } from "@tanstack/react-query";
import logo from "../../../assets/logo_aspic_bianco.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginTypeSchema,
} from "../../../features/services/schemas/schemas";
import { useNavigate } from "@tanstack/react-router";
import { createLoginMutationOptions } from "../../../api/auth/createLoginMutationOptions";
import { AUTH_MESSAGES } from "../../../costants/authMessages";
import { useAuthStore } from "../../../store";
import { LoginInput } from "../../../components/login/LoginInput";
import { LoginErrorSpan } from "../../../components/login/LoginErrorSpan";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const setData = useAuthStore((s) => s.setData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, error: mutationError } = useMutation(
    createLoginMutationOptions({
      onError: (error) => {
        if (!error.response?.data) return;

        const { message, emailVerificationToken } = error.response?.data;

        if (message === AUTH_MESSAGES.ACCOUNT_NOT_COMPLETED) {
          navigate({
            from: "/admin",
            to: "/admin/verifica",
            search: { token: emailVerificationToken },
          });
        }
      },
      onSuccess: (data) => {
        setData({ accessToken: data.accessToken });

        navigate({ from: "/admin", to: "/dashboard" });
      },
    }),
  );

  const onSubmit = (data: LoginTypeSchema) => {
    mutate(data);
  };

  return (
    <main>
      <div className="min-h-screen flex items-center justify-center bg-sidebar relative overflow-hidden px-4 md:px-0">
        <div className="absolute content[''] -bottom-37.5 -left-37.5 w-100 h-100 rounded-full bg-primary opacity-[.08] blur-[100px] pointer-events-none"></div>
        <div className="absolute content[''] -top-50 -right-50 w-150 h-160 rounded-full bg-blue-mid opacity-[.06] blur-[80px] pointer-events-none"></div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-10 py-12 bg-blue-dark border border-login-border rounded-3xl w-full max-w-100 relative z-1 fadeUp"
        >
          <div className="mb-6">
            <img
              src={logo}
              alt="logo aspic reggio calabria"
              fetchPriority="high"
              width={320}
            />
          </div>
          <div className="mb-8 text-sm text-login-white text-center uppercase tracking-wider">
            Pannello amministrativo
          </div>
          <div className="mb-4.5">
            <LoginInput
              id="email"
              type="email"
              control={control}
              inputName="email"
              placeholder="admin@aspicrc.it"
              label="Email"
            />
            <LoginErrorSpan errors={errors} inputName="email" />
          </div>
          <div className="mb-4.5">
            <LoginInput
              id="password"
              type="password"
              control={control}
              inputName="password"
              placeholder="••••••••"
              label="Password"
            />
            <LoginErrorSpan errors={errors} inputName="password" />
          </div>
          <button
            className="w-full mt-2 bg-primary p-3.5 rounded-xl text-form cursor-pointer font-medium text-white hover:bg-blue-mid hover:-translate-y-px transition-all duration-200"
            type="submit"
          >
            Accedi
          </button>
          {mutationError && (
            <div className="mt-3 text-xs text-center text-login-warn">
              {mutationError.response?.data.message}
            </div>
          )}
        </form>
      </div>
    </main>
  );
};
