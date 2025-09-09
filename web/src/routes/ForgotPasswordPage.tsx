import {
  forgotPasswordSchema,
  type ForgotPasswordData,
} from "@/schemas/account";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JSX } from "react";
import { useForm, Controller } from "react-hook-form";
import InputWithError from "@/components/InputWithError";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useForgotPasswordAccount } from "@/hooks/account/useForgotPasswordAccount";
import { useSearchParams } from "react-router";

export default function ForgotPasswordPage(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordAccountMutation = useForgotPasswordAccount(() => {
    toast.success("Email enviado com sucesso");
    navigate("/login");
  });

  const onSubmit = (data: ForgotPasswordData) => {
    forgotPasswordAccountMutation.mutate({
      email: data.email,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div
        className="bg-white border border-neutral-300 min-w-80 min-h-80 rounded-lg 
                      max-w-[90%] w-full h-full py-8 md:max-w-[468px]
                      md:p-14"
      >
        <header className="p-4 text-center">
          <h1 className="font-bold text-2xl md:text-3xl">TaskMaster</h1>
          <h2 className="text-neutral-600 mt-4 leading-2">
            Adicione seu email para resetar sua senha
          </h2>
        </header>

        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8 lg:min-w-[30%]">
            <div
              className="flex flex-col gap-1"
              aria-description="caixa de texto para adicionar o nome"
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputWithError
                    label="E-mail"
                    id="email"
                    error={errors.email?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <button className="bg-green-600 text-white mt-2" type="submit">
              Enviar email
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
