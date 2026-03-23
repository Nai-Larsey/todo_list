"use server";

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const content = formData.get("content") as string;
  if (!content) return;

  await db.insert(todos).values({ content });
  revalidatePath("/");
}

export async function toggleTodo(id: number, currentStatus: boolean) {
  await db.update(todos)
    .set({ isCompleted: !currentStatus })
    .where(eq(todos.id, id));
  revalidatePath("/");
}

export async function deleteTodo(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath("/");
}
