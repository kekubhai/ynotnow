import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
export async function TodosList() {
  const sql = neon(process.env.DATABASE_URL!);

  // get the todos with the owner
  const todosWithOwner = await sql`
    SELECT 
      todos.id,
      todos.task,
      todos.is_complete,
      users.id as "owner.id",
      users.email as "owner.email"
    FROM todos
    LEFT JOIN neon_auth.users_sync users ON todos.owner_id = users.id
    ORDER BY todos.inserted_at ASC;
  `;

  return (
    <ul className="bg -white">
      {todosWithOwner.map((todo) => (
        <li className="bg-red-500 text-white" key={todo.id}>
          <span className="text-shadow-yellow-600">{todo.task}</span>
          <span className="text-black">{todo.owner_id}</span>
        </li>
      ))}
    </ul>
  );
}