"use client";

import { Todo } from "@prisma/client";
import { startTransition, useOptimistic } from "react";

import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface Props {
  todo: Todo;
  // TODO: Acciones que quiero llamar
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => setOptimisticTodo(!optimisticTodo.complete));

      await toggleTodo(optimisticTodo.id, !optimisticTodo.complete);
    } catch (error) {
      startTransition(() => setOptimisticTodo(!optimisticTodo.complete));

      console.error(error);
    }
  };

  return (
    <div
      className={optimisticTodo.complete ? styles.todoDone : styles.todoPending}
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={onToggleTodo}
          className={`
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-60
            ${optimisticTodo.complete ? "bg-blue-100" : "bg-red-100"}
          `}
        >
          {optimisticTodo.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">
          {optimisticTodo.description}
        </div>
      </div>
    </div>
  );
};
