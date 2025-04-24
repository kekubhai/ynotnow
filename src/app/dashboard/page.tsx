import { UserButton, useUser } from "@stackframe/stack";

export default function Dashbaord (){
    const user=useUser();
    const loggedIn=user!==null;
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {loggedIn ? (
                <p>Welcome back, {user?.displayName}!</p>
            ) : (
                <p>Please log in to access your dashboard.</p>

            )}
            <div>
                <UserButton/>
            </div>
        </div>
    );


}