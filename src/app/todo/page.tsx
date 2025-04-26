'use client';
  
import type { Todo } from '@/lib/db/schema';
import { neon } from '@neondatabase/serverless';
import { useUser } from '@stackframe/stack';
import { useEffect, useState } from 'react';
  
const getDb = (token: string) =>
    neon(process.env.DATABASE_URL!, {
        authToken: async () => token,
    });
  
export default function TodoPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <TodoList />
        </div>
    );
}

function TodoList() {
    const user = useUser();
    const [todos, setTodos] = useState<Array<Todo>>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        async function loadTodos() {
            try {
                setIsLoading(true);
                setError(null);
                
                const authToken = (await user?.getAuthJson())?.accessToken; 
                
                if (!authToken) {
                    setError("Not authenticated");
                    return;
                }
                
                const sql = getDb(authToken);
                
                // WHERE filter is optional because of RLS.
                // But we send it anyway for performance reasons.
                const todosResponse = await
                    sql('select * from todos where user_id = auth.user_id()');
                
                setTodos(todosResponse as Array<Todo>);
            } catch (err) {
                console.error("Failed to load todos:", err);
                setError("Failed to load todos");
            } finally {
                setIsLoading(false);
            }
        }
  
        loadTodos();
    }, [user]);
  
    if (isLoading) return <div>Loading todos...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!todos?.length) return <div>No todos found</div>;

    return (
        <ul className="space-y-2">
            {todos.map((todo) => (
                <li key={todo.id} className="p-2 bg-white shadow rounded">
                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            checked={todo.isComplete} 
                            readOnly 
                            className="h-4 w-4"
                        />
                        <span className={todo.isComplete ? "line-through" : ""}>
                            {todo.task}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );
}
