"use client";

import { useTransition } from "react";
import { toggleTodo, deleteTodo } from "@/app/actions";

export function TodoActions({ id, isCompleted }: { id: number, isCompleted: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => startTransition(() => toggleTodo(id, isCompleted))}
        disabled={isPending}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
          isCompleted 
            ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700" 
            : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20"
        } disabled:opacity-50`}
      >
        {isCompleted ? "Undo" : "Done"}
      </button>
      <button
        onClick={() => startTransition(() => deleteTodo(id))}
        disabled={isPending}
        className="px-3 py-1 bg-rose-950/30 text-rose-400 border border-rose-500/20 rounded-lg text-sm font-medium hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
