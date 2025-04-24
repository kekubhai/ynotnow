'use client';

import type { Todo } from '@/app/schema';
import { neon } from '@neondatabase/serverless';
import { useUser } from '@stackframe/stack';
import { useEffect, useState } from 'react';

// ✅ Use a proper connection string directly (NOT overwriting the neon function)
const DATABASE_URL = 'postgresql://authenticated:npg_5Xsf7MaNIbLB@ep-dry-sky-a4ne1obe-pooler.us-east-1.aws.neon.tech/ynotnow?sslmode=require';

const getDb = (token: string) =>
  neon(DATABASE_URL, {
    authToken: token,
  });

export default function TodoList() {
  const user = useUser();
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    async function loadTodos() {
      try {
        const authToken = (await user?.getAuthJson())?.accessToken;
        if (!authToken) return;

        const sql = getDb(authToken);

        const todosResponse = await sql`
          SELECT * FROM todos WHERE user_id = auth.uid()
        `;

        setTodos(todosResponse);
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }

    loadTodos();
  }, [user]);

  return (
    <ul>
      {todos?.length > 0 ? (
        todos.map((todo) => <li key={todo.id}>{todo.task}</li>)
      ) : (
        <h3>hello</h3>
      )}
    </ul>
  );
}
