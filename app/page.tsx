import { db } from "@/db";
import { todos } from "@/db/schema";
import { desc } from "drizzle-orm";
import { addTodo } from "./actions";
import { TodoActions } from "@/components/todo-actions";

export default async function Page() {
  let allTodos = [];
  try {
    allTodos = await db.query.todos.findMany({
      orderBy: [desc(todos.createdAt)],
    });
  } catch (e) {
    console.error("Database connection failed:", e);
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent mb-4">
            Setup Required
          </h1>
          <p className="text-zinc-400 mb-6 font-mono text-xs break-all bg-zinc-950 p-2 rounded border border-rose-500/20">
            {(e as Error).message}
          </p>
          <div className="bg-black/50 rounded-2xl p-4 text-left font-mono text-sm text-zinc-500 break-all">
            {process.env.DATABASE_URL?.split('@')[1] || "No DATABASE_URL found"}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-20 px-4 selection:bg-indigo-500/30">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-zinc-600 bg-clip-text text-transparent">
              Tasks
            </h1>
            <p className="text-zinc-500 mt-2">Manage your daily workflow</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-xl font-bold text-white leading-none">
              {allTodos.filter(t => !t.isCompleted).length}
            </span>
          </div>
        </div>

        <form action={addTodo} className="relative group mb-12">
          <input
            name="content"
            type="text"
            placeholder="What needs to be done?"
            required
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-600"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition-colors"
          >
            Add
          </button>
        </form>

        <div className="space-y-3">
          {allTodos.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-3xl">
              <p className="text-zinc-500">No tasks found. Add one above!</p>
            </div>
          ) : (
            allTodos.map((todo) => (
              <div
                key={todo.id}
                className="group flex items-center justify-between p-5 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl hover:bg-zinc-900/60 hover:border-zinc-700/50 transition-all hover:translate-x-1"
              >
                <span className={`text-lg transition-all ${
                  todo.isCompleted ? "text-zinc-600 line-through" : "text-zinc-200"
                }`}>
                  {todo.content}
                </span>
                <TodoActions id={todo.id} isCompleted={todo.isCompleted} />
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
