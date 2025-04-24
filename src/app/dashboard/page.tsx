import { AddTodoForm } from "@/components/todo-add-form";
import { TodosList } from "@/components/todo-list";


import { stackServerApp } from "@/stack";
 

export default async function Home() {
  const user = await stackServerApp.getUser();

  if (!user) {
    return (
      <h2>hello</h2>
    );
  }

  return (
    <div>
      <h1>Todos</h1>
      <main>
        <AddTodoForm />
        <TodosList />
      </main>
    </div>
  );
}