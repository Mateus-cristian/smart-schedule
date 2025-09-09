import InputWithError from "@/components/InputWithError";
import { loginAccountSchema, type LoginAccountInput } from "@/schemas/login";
import { useAuthStore } from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JSX } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function LoginPage(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAccountInput>({
    resolver: zodResolver(loginAccountSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const onSubmit = async (data: LoginAccountInput) => {
    await login(data.email, data.password);

    toast.success("Usuário Autenticado com sucesso");
    navigate("/tasks");
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
            Sua produtividade o espera
          </h2>
        </header>

        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 lg:min-w-[30%]">
            <div
              className="flex flex-col gap-1"
              aria-description="caixa de texto para adicionar o nome da tarefa"
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputWithError
                    label="Email"
                    id="email"
                    error={errors.email?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div
              className="flex flex-col gap-1"
              aria-description="caixa de texto para adicionar o nome da tarefa"
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <InputWithError
                    label="Senha"
                    id="senha"
                    type="password"
                    error={errors.password?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <button type="submit" className="bg-green-600 text-white">
              Login
            </button>
          </div>
        </form>

        <footer className="flex flex-col gap-2 justify-center w-full">
          <a
            href="/esquecer-senha"
            className="font-semibold text-green-600 text-center"
          >
            Esqueci minha senha
          </a>
          <a
            href="/criar-conta"
            className="font-semibold text-green-600 text-center"
          >
            Criar uma conta
          </a>
        </footer>
      </div>
    </div>
  );
}
