import {
  createAccountSchema,
  type CreateAccountInput,
} from "@/schemas/account";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JSX } from "react";
import { useForm, Controller } from "react-hook-form";
import InputWithError from "@/components/InputWithError";
import api from "@/api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function CreateAccountPage(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: CreateAccountInput) => {
    try {
      await api.post("/users", {
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
          password_confirmation: data.confirmPassword,
        },
      });

      toast.success("Usuário criado com sucesso");

      navigate("/login");
    } catch (err: any) {
      toast.success(
        "Erro ao criar usuário,tente novamente, se persistir contate suporte",
        {
          position: "bottom-right",
        }
      );
    }
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
            Crie sua conta para começar
          </h2>
        </header>

        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8 lg:min-w-[30%]">
            <div
              className="flex flex-col gap-1"
              aria-description="caixa de texto para adicionar o nome"
            >
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <InputWithError
                    label="Nome"
                    id="username"
                    error={errors.username?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div
              className="flex flex-col gap-1"
              aria-description="caixa de texto para adicionar o e-mail"
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
              aria-description="caixa de texto para adicionar a senha"
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <InputWithError
                    label="Senha"
                    id="password"
                    type="password"
                    error={errors.password?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div
              className="flex flex-col gap-1"
              aria-description="caixa de texto para adicionar a senha"
            >
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <InputWithError
                    label="Confirmar senha"
                    id="confirmPassword"
                    type="password"
                    error={errors.confirmPassword?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <button className="bg-green-600 text-white mt-2" type="submit">
              Criar conta
            </button>
          </div>
        </form>

        <footer className="flex flex-col gap-2 justify-center w-full">
          <a href="/login" className="font-semibold text-green-600 text-center">
            Já tenho uma conta
          </a>
        </footer>
      </div>
    </div>
  );
}
