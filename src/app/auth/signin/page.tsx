import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SignInButtons } from "@/components/sign-in-buttons";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to YNOTNOW
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Share your startup ideas and get AI-powered analysis
          </p>
        </div>

        <SignInButtons />
      </div>
    </div>
  );
} 