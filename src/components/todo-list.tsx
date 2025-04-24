import { neon } from "@neondatabase/serverless";

export async function TodosList() {
  const sql = neon(process.env.DATABASE_URL_DEVURL!);

  // get the todos with the owner
  const todosWithOwner = await sql`
    SELECT 
      todos.id,
      todos.task,
      todos.is_complete
    FROM todos
    ORDER BY todos.inserted_at ASC;
  `;

  return (
    <ul className="bg-white">
      {todosWithOwner.map((todo) => (
        <li className="bg-red-500 text-white" key={todo.id}>
          <span className="text-shadow-yellow-600">{todo.task}</span>
          
        </li>
      ))}
    </ul>
  );
}