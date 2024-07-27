"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function SignInPage() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                <button
                    className="w-full py-2 mb-4 text-white bg-black rounded hover:bg-gray-800"
                    onClick={() => signIn("github", { callbackUrl: "/dashborad" })}
                >
                    Login with GitHub
                </button>
                <button
                    className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => signIn("email", { callbackUrl: "/dashborad" })}
                >
                    Login with Email
                </button>
            </div>
        </div>
    );
}
