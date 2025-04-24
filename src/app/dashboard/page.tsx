'use client';
import dotenv from 'dotenv';
import type { Todo } from '@/app/schema';
import { neon } from '@neondatabase/serverless';
import { useUser } from '@stackframe/stack';
import { useEffect, useState } from 'react';

const getDb = (token: string) =>
  neon(process.env.DATABASE_AUTHENTICATED_URL!, {
    authToken: token,
  });

export  default function TodoList() {
  const user = useUser();
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    async function loadTodos() {
      try {
        const authToken = (await user?.getAuthJson())?.accessToken;

        if (!authToken) {
          return;
        }

        const sql = getDb(authToken);

        const todosResponse = await sql<Array<Todo>>`
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
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.task}</li>
      ))}
    </ul>
  );
}
