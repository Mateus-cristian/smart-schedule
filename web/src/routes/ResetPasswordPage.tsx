import { resetPasswordSchema, type ResetPasswordData } from "@/schemas/account";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JSX } from "react";
import { useForm, Controller } from "react-hook-form";
import InputWithError from "@/components/InputWithError";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import { useResetPasswordAccount } from "@/hooks/account/useResetPasswordAccount";

export default function ResetPasswordPage(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  const resetPasswordMutation = useResetPasswordAccount(() => {
    toast.success("Senha redefinida com sucesso!");
    navigate("/login");
  });

  const onSubmit = (data: ResetPasswordData) => {
    if (!token) {
      toast.error("Token inválido ou ausente na URL.");
      return;
    }
    resetPasswordMutation.mutate({ ...data, token });
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white border border-neutral-300 min-w-80 min-h-80 rounded-lg max-w-[90%] w-full h-full py-8 md:max-w-[468px] md:p-14">
        <header className="p-4 text-center">
          <h1 className="font-bold text-2xl md:text-3xl">TaskMaster</h1>
          <h2 className="text-neutral-600 mt-4 leading-2">
            Redefina sua senha
          </h2>
        </header>

        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8 lg:min-w-[30%]">
            <div className="flex flex-col gap-1">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <InputWithError
                    label="Nova senha"
                    id="password"
                    type="password"
                    error={errors.password?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Controller
                name="passwordConfirmation"
                control={control}
                render={({ field }) => (
                  <InputWithError
                    label="Confirme a nova senha"
                    id="passwordConfirmation"
                    type="password"
                    error={errors.passwordConfirmation?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <button
              className="bg-green-600 text-white mt-2"
              type="submit"
              disabled={resetPasswordMutation.status === "pending"}
            >
              {resetPasswordMutation.status === "pending"
                ? "Redefinindo..."
                : "Redefinir senha"}
            </button>
          </div>
        </form>

        <footer className="flex flex-col gap-2 justify-center w-full">
          <a href="/login" className="font-semibold text-green-600 text-center">
            Voltar
          </a>
        </footer>
      </div>
    </div>
  );
}
