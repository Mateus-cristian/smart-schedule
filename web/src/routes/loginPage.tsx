import type { JSX } from "react";

export default function LoginPage(): JSX.Element {
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
            Your productivity awaits
          </h2>
        </header>

        <form className="p-4">
          <div className="flex flex-col gap-2 lg:min-w-[30%]">
            <div
              className="flex flex-col gap-1"
              aria-description="caixa de texto para adicionar o nome da tarefa"
            >
              <label htmlFor="name">E-mail</label>
              <input type="text" name="" id="name" />
            </div>
            <div
              className="flex flex-col gap-1"
              aria-description="caixa de texto para adicionar o nome da tarefa"
            >
              <label htmlFor="name">Senha</label>
              <input type="text" name="" id="name" />
            </div>
            <button className="bg-green-600 text-white">Login</button>
          </div>
        </form>

        <footer className="flex flex-col gap-2 justify-center w-full">
          <a href="" className="font-semibold text-green-600 text-center">
            Esqueci minha senha
          </a>
          <a href="" className="font-semibold text-green-600 text-center">
            Criar uma conta
          </a>
        </footer>
      </div>
    </div>
  );
}
