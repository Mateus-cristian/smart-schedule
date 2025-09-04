import { useState, type JSX } from "react";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import InputWithError from "@/components/InputWithError";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskData } from "@/schemas/task";
import { useTasks } from "@/hooks/task/useTasks";
import { useCreateTask } from "@/hooks/task/useCreateTask";
import { useUpdateTask } from "@/hooks/task/useUpdateTask";
import { useDeleteTask } from "@/hooks/task/useDeleteTask";
import { useTasksByTitle } from "@/hooks/task/useSearchByTitle";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export default function TasksPage(): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      active: false,
    },
  });

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 500);
  const { data: tasks } =
    debouncedSearch.length > 0 ? useTasksByTitle(debouncedSearch) : useTasks();

  const createTaskMutation = useCreateTask(() => {
    toast.success("Task criada com sucesso");
    reset();
  });

  const deleteTaskMutation = useDeleteTask(() => {
    toast.success("Task deletada com sucesso");
  });

  const updateTaskMutation = useUpdateTask(() => {
    toast.success("Task atualizada com sucesso");
  });

  const onSubmit = (data: TaskData) => {
    createTaskMutation.mutate(data);
  };

  return (
    <div className="container w-[95%] m-auto lg:w-[75%] xl:w-[50%]">
      <header className="pt-7">
        <div className="bg-neutral-100 w-full flex flex-col gap-2 border border-neutral-200 px-2 py-4 rounded mt-6 ">
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2 w-full lg:flex-row">
              <div className="flex flex-col gap-4 lg:min-w-[30%]">
                <div
                  className="flex flex-col gap-1"
                  aria-description="caixa de texto para adicionar o nome da tarefa"
                >
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <InputWithError
                        label="Titulo"
                        id="title"
                        error={errors.title?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div
                  className="flex flex-col gap-1"
                  aria-description="caixa de texto para adicionar data e hora para lembrar da tarefa"
                >
                  <Controller
                    name="dueDate"
                    control={control}
                    render={({ field }) => (
                      <InputWithError
                        type="datetime-local"
                        label="Data prevista da tarefa"
                        id="dueDate"
                        error={errors.dueDate?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              <div
                className="flex flex-col gap-1 h-auto w-full"
                aria-description="caixa de texto para adicionar descrição da tarefa"
              >
                <Controller
                  name="description"
                  control={control}
                  render={({ field, formState: { errors } }) => (
                    <div className="flex flex-col gap-1 relative">
                      <label htmlFor="description">Descrição</label>
                      <textarea
                        id="description"
                        className="h-full resize-none"
                        {...field}
                      />
                      {errors.description && (
                        <span
                          className="text-xs text-red-600 absolute left-0 -bottom-5 min-h-0 w-full pointer-events-none"
                          style={{ minHeight: "0", height: "1.25rem" }}
                        >
                          {errors.description?.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white h-fit self-end min-w-[150px]"
              aria-label="Adicionar tarefa"
            >
              Adicionar
            </button>
          </form>
        </div>

        <div className="bg-neutral-100 w-full flex flex-col gap-2 border border-neutral-200 px-2 py-4 rounded mt-6">
          <input
            type="text"
            name="filter"
            id="filter"
            aria-label="Buscar tarefa pelo nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
          {tasks &&
            tasks.map((todo: TaskData, index: number) => (
              <div
                className="flex items-start border border-neutral-200 px-2 py-2 rounded justify-between"
                key={index}
              >
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={todo.active}
                    className="self-start mt-[0.35rem]"
                    aria-label="Marcar tarefa como concluída"
                    onChange={(e) => {
                      const checked = e.target.checked;

                      updateTaskMutation.mutate({
                        ...todo,
                        id: todo.id!,
                        active: checked,
                      });
                    }}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{todo.title}</span>
                    <p className="text-neutral-600 text-sm">
                      {todo.description}
                    </p>
                    <p className="text-neutral-600 text-sm">
                      Data: <span>{todo.dueDate}</span>
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => deleteTaskMutation.mutate(todo.id!)}
                  className="bg-red-500 w-8 h-8 rounded items-center justify-center flex cursor-pointer"
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
