'use client'
import React from 'react';
import { UserButton, useUser } from "@stackframe/stack";

export default function Dashboard() {
  const user = useUser();
  const loggedIn = user !== null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-white px-4">
      <h1 className="text-4xl font-extrabold mb-4">Dashboard</h1>

      {loggedIn ? (
        <p className="text-lg mb-6">Welcome back, <span className="font-semibold">{user?.displayName}</span>!</p>
      ) : (
        <p className="text-lg mb-6">Please log in to access your dashboard.</p>
      )}

      <div className="mt-2">
        <UserButton />
      </div>
    </div>
  );
}
