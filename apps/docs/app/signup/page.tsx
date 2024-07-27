"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '../globals.css';

export default function SignUpPage() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                
                <button
                    className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={async () => {
                        const res = await signIn("credentials", {
                            username: "",
                            password: "",
                            redirect: false,
                        });
                        console.log(res);
                        router.push("/");
                    }}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}
