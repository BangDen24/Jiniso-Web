'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { STATIC_CREDENTIALS, ADMIN_CREDENTIALS } from '@/lib/credentials';
import { INITIAL_USER, INITIAL_ADMIN } from '@/lib/data';
import { Lock, User as UserIcon, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const { login, t } = useApp();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate network delay
        setTimeout(() => {
            if (username === STATIC_CREDENTIALS.username && password === STATIC_CREDENTIALS.password) {
                login(INITIAL_USER);
                router.push('/');
            } else if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                login(INITIAL_ADMIN);
                router.push('/admin');
            } else {
                setError('Invalid credentials. Hint: use jiniso.admin/adminjiniso123 or dini.cahyo/dincay123');
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md z-10 animate-fade-in-up">
                <div className="text-center mb-10 space-y-4">
                    <Link href="/" className="inline-block">
                        <h1 className="text-4xl font-bold tracking-[0.2em] text-white">JINISO</h1>
                    </Link>
                    <p className="text-zinc-400 font-medium tracking-widest uppercase text-xs">
                        Login
                    </p>
                </div>

                <div className="bg-zinc-800/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white tracking-tight italic uppercase">Welcome Back</h2>
                        <p className="text-zinc-500 text-sm">Please enter your credentials to continue.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-accent transition-colors">
                                    <UserIcon size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:ring-2 focus:outline-none focus:ring-accent/20 focus:border-accent transition-all"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-accent transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:ring-2 focus:outline-none focus:ring-accent/20 focus:border-accent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-400 text-xs font-bold bg-red-400/10 p-4 rounded-xl border border-red-400/20 animate-shake">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-white text-zinc-900 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center space-x-3 hover:bg-accent hover:text-white transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover-lift'
                                }`}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-4 text-center">
                        <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold">
                            Don't have credentials? <span className="text-accent underline cursor-pointer">Contact Support</span>
                        </p>
                    </div>
                </div>

                <div className="mt-12 flex justify-center space-x-8 text-zinc-700 font-bold uppercase tracking-[0.3em] text-[8px]">
                    <span className="flex items-center space-x-2">
                        <Sparkles size={10} />
                        <span>Seamless CX</span>
                    </span>
                    <span>Secure Protocol</span>
                    <span>v2.8.0</span>
                </div>
            </div>
        </div>
    );
}
