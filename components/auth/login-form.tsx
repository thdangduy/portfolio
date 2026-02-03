"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { JetBrainsMono } from '@/fonts';
import { cn } from '@/lib/utils';
import Link from "next/link";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminSecret, setAdminSecret] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isSignUp) {
                const { error } = await authClient.signUp.email({
                    fetchOptions: {
                        headers: {
                            "x-admin-secret": adminSecret
                        },

                        onSuccess: () => {
                            toast.success("Account created successfully!");
                            setIsSignUp(false);
                        },
                    },
                    email,
                    password,
                    name,
                });
                if (error) {
                    toast.error(error.message)
                }
            } else {
                const { error } = await authClient.signIn.email({

                    fetchOptions: {
                        headers: {
                            "x-admin-secret": adminSecret
                        },

                        onSuccess: () => {
                            toast.success("Logged in successfully!");
                            router.push("/blog/editor");
                        },
                    },
                    email,
                    password,
                });

                if (error) {
                    toast.error(error.message)
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("w-full max-w-md mx-auto p-6 bg-blog-bg border border-blog-inactive-border rounded-lg", JetBrainsMono.className)}>
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-blog-orange mb-2">
                    {isSignUp ? "Create Account" : "Welcome Back"}
                </h1>
                <p className="text-blog-fg/60 text-sm">
                    {isSignUp ? "Enter your details to register" : "Enter your credentials to access the editor"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-blog-fg">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={isSignUp}
                            className="w-full px-3 py-2 bg-blog-black border border-blog-inactive-border rounded-md focus:border-blog-orange focus:ring-1 focus:ring-blog-orange outline-none text-blog-fg transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-blog-fg">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-blog-black border border-blog-inactive-border rounded-md focus:border-blog-orange focus:ring-1 focus:ring-blog-orange outline-none text-blog-fg transition-all"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-blog-fg">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-blog-black border border-blog-inactive-border rounded-md focus:border-blog-orange focus:ring-1 focus:ring-blog-orange outline-none text-blog-fg transition-all"
                        placeholder="••••••••"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-blog-fg">Admin Secret</label>
                    <input
                        type="password"
                        value={adminSecret}
                        onChange={(e) => setAdminSecret(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-blog-black border border-blog-inactive-border rounded-md focus:border-blog-orange focus:ring-1 focus:ring-blog-orange outline-none text-blog-fg transition-all"
                        placeholder="••••••••"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-4 bg-blog-orange text-blog-bg font-bold rounded-md hover:bg-blog-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                    {isLoading ? (isSignUp ? "Creating account..." : "Signing in...") : (isSignUp ? "Sign Up" : "Sign In")}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-blog-fg/60">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blog-cyan hover:underline focus:outline-none"
                    type="button"
                >
                    {isSignUp ? "Sign In" : "Sign Up"}
                </button>
            </div>

            <div className="mt-8 pt-6 border-t border-blog-inactive-border text-center">
                <Link href="/" className="text-sm text-blog-fg/40 hover:text-blog-fg transition-colors">
                    ← Back to portfolio
                </Link>
            </div>
        </div>
    );
}
