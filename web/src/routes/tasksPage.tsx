import type { JSX } from "react";
import { FiTrash2 } from "react-icons/fi";

import mock from "@/mock.json";

export default function TasksPage(): JSX.Element {
  const { todos } = mock;

  return (
    <div className="container w-[95%] m-auto lg:w-[75%] xl:w-[50%]">
      <header className="pt-7">
        <h1 className="text-center font-semibold text-3xl">Task Master</h1>
        <div className="bg-neutral-100 w-full flex flex-col gap-2 border border-neutral-200 px-2 py-4 rounded mt-6 ">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 w-full lg:flex-row">
              <div className="flex flex-col gap-2 lg:min-w-[30%]">
                <div
                  className="flex flex-col gap-1"
                  aria-description="caixa de texto para adicionar o nome da tarefa"
                >
                  <label htmlFor="name">Nome</label>
                  <input type="text" name="" id="name" />
                </div>
                <div
                  className="flex flex-col gap-1"
                  aria-description="caixa de texto para adicionar data e hora para lembrar da tarefa"
                >
                  <label htmlFor="">Quando lembrar?</label>
                  <input type="datetime-local" name="" id="" />
                </div>
              </div>
              <div
                className="flex flex-col gap-1 h-auto w-full"
                aria-description="caixa de texto para adicionar descrição da tarefa"
              >
                <label htmlFor="description">Descrição</label>
                <textarea
                  name=""
                  id="description"
                  className="h-full resize-none"
                />
              </div>
            </div>
            <button
              className="bg-green-500 text-white h-fit self-end min-w-[150px]"
              aria-label="Adicionar tarefa"
            >
              <span>+</span>Add Task
            </button>
          </div>
        </div>

        <div className="bg-neutral-100 w-full flex flex-col gap-2 border border-neutral-200 px-2 py-4 rounded mt-6">
          <input
            type="text"
            name=""
            id=""
            aria-label="Buscar tarefa pelo nome"
          />
          <div
            className="flex gap-2"
            aria-description="Checkbox para buscar somente por tarefas concluídas"
          >
            <input type="checkbox" name="" placeholder="Buscar por tarefa" />
            <span className="text-neutral-500">mostrar apenas ativas</span>
          </div>
        </div>
      </header>

      <main className="m-auto mt-8">
        <article className="flex flex-col gap-4">
          {todos.map((todo, index) => (
            <div
              className="flex items-start border border-neutral-200 px-2 py-2 rounded justify-between"
              key={index}
            >
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="self-start mt-[0.35rem]"
                  aria-label="Marcar tarefa como concluída"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{todo.name}</span>
                  <p className="text-neutral-600 text-sm">{todo.description}</p>
                  <p className="text-neutral-600 text-sm">
                    Due: <span>{todo.dueDate}</span>
                  </p>
                </div>
              </div>

              <div
                className="bg-red-500 w-8 h-8 rounded items-center justify-center flex"
                aria-label="Deletar tarefa"
              >
                <FiTrash2 color="white" />
              </div>
            </div>
          ))}
        </article>
      </main>
    </div>
  );
}
