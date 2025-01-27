export const dynamic = "force-dynamic";
export const revalidate = 0;

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Listado de Todos",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  const session = await getServerSession(authOptions);

  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  );
}
