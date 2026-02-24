'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ShoppingCart, User, LogIn, LogOut, Search, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const { user, logout, lang, setLang, t } = useApp();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const cartCount = user?.cartItems.reduce((acc, item) => acc + item.quantity, 0) || 0;

    const mainCategories = [
        { id: 'Women', label: t('women') },
        { id: 'Men', label: t('men') },
        { id: 'Kids', label: t('kids') },
        { id: 'Accessories', label: t('accessories') },
        { id: 'Collections', label: t('collections') },
    ];

    const subCategories = [
        { id: 'Tops', label: t('tops') },
        { id: 'Bottoms', label: t('bottoms') },
        { id: 'Outerwear', label: t('outerwear') },
        { id: 'Innerwear', label: t('innerwear') },
        { id: 'Accessories', label: t('accessories') },
    ];

    const languages: { code: typeof lang; label: string; flag: string }[] = [
        { code: 'ID', label: t('langIndo'), flag: 'https://flagcdn.com/id.svg' },
        { code: 'EN', label: t('langEng'), flag: 'https://flagcdn.com/us.svg' },
        { code: 'JP', label: t('langJp'), flag: 'https://flagcdn.com/jp.svg' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
            {/* Top Utility Bar */}
            <div className="bg-zinc-50 border-b border-zinc-100 py-2 hidden sm:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[11px] font-medium text-muted uppercase tracking-wider">
                    <div className="flex items-center space-x-6">
                        <Link href="/help" className="hover:text-accent transition-colors">{t('help')}</Link>
                        <Link href="/store-locator" className="hover:text-accent transition-colors">{t('storeLocator')}</Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-4 border-r pr-6 border-zinc-200">
                            {languages.map(l => (
                                <button
                                    key={l.code}
                                    onClick={() => setLang(l.code)}
                                    title={l.label}
                                    className={`w-[18px] h-[14px] rounded-[2px] overflow-hidden transition-all duration-300 hover:scale-110 flex items-center justify-center ${lang === l.code
                                        ? 'grayscale-0 opacity-100 ring-1 ring-accent ring-offset-2'
                                        : 'grayscale opacity-40 hover:opacity-100 hover:grayscale-[50%]'
                                        }`}
                                >
                                    <img src={l.flag} alt={l.label} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                        {!user ? (
                            <Link href="/login" className="text-accent underline decoration-accent/20">{t('login')}</Link>
                        ) : (
                            <span className="text-accent italic">{t('welcome')}, {user.name}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-accent">
                            JINISO
                        </Link>

                        {/* Desktop Categories */}
                        <div className="hidden lg:flex items-center space-x-2">
                            {mainCategories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="relative group h-full"
                                    onMouseEnter={() => setActiveMenu(cat.id)}
                                    onMouseLeave={() => setActiveMenu(null)}
                                >
                                    <Link
                                        href={`/products?category=${cat.id}`}
                                        className="flex items-center space-x-1 px-4 py-7 text-sm font-bold uppercase tracking-tight text-foreground hover:text-accent transition-colors"
                                    >
                                        <span>{cat.label}</span>
                                    </Link>

                                    {/* Mega Menu style dropdown */}
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border border-zinc-100 p-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-4 border-b pb-2">{t('collection')}</p>
                                        <ul className="space-y-3">
                                            {subCategories.map(sub => (
                                                <li key={sub.id}>
                                                    <Link
                                                        href={`/products?category=${cat.id}&type=${sub.id}`}
                                                        className="text-xs font-semibold text-muted hover:text-accent transition-colors flex justify-between items-center group/sub"
                                                    >
                                                        <span>{sub.label}</span>
                                                        <ChevronDown size={14} className="-rotate-90 opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href={`/products?category=${cat.id}`} className="mt-6 block text-[10px] font-bold uppercase tracking-widest text-accent text-center border border-accent/20 py-2 hover:bg-accent hover:text-white transition-all">
                                            {t('viewAll')} {cat.label}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <div className="hidden md:flex items-center bg-zinc-100 rounded-sm px-3 py-1.5 focus-within:ring-1 ring-accent/20 transition-all">
                            <Search size={16} className="text-muted mr-2 cursor-pointer hover:text-accent" onClick={() => {
                                if (searchQuery.trim()) window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                            }} />
                            <input
                                type="text"
                                placeholder={t('search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchQuery.trim()) {
                                        window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                                    }
                                }}
                                className="bg-transparent border-none text-xs focus:outline-none w-32 xl:w-48"
                            />
                        </div>

                        {!user ? (
                            <Link
                                href="/login"
                                className="hidden sm:flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-accent border border-accent/20 px-4 py-2 hover:bg-accent hover:text-white transition-all shadow-sm"
                            >
                                <LogIn size={16} />
                                <span>Login</span>
                            </Link>
                        ) : (
                            <div className="flex items-center space-x-4 sm:space-x-6">
                                {user.role === 'admin' && (
                                    <Link href="/admin" className="text-accent hover:opacity-70 transition-opacity flex items-center space-x-1 border border-accent/20 px-2 py-1 rounded">
                                        <span className="text-[10px] font-bold uppercase tracking-wider hidden xl:block">{t('adminDashboard')}</span>
                                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                    </Link>
                                )}
                                <Link href="/cart" className="relative text-accent hover:opacity-70 transition-opacity">
                                    <ShoppingCart size={22} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Link href="/account" className="text-accent hover:opacity-70 transition-opacity">
                                    <User size={22} />
                                </Link>
                                <button onClick={handleLogout} className="text-muted hover:text-accent transition-colors hidden sm:block">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        )}

                        <button
                            className="lg:hidden text-accent"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-white lg:hidden overflow-y-auto">
                    <div className="p-4 flex justify-between items-center border-b sticky top-0 bg-white">
                        <div className="flex items-center space-x-5">
                            {languages.map(l => (
                                <button
                                    key={l.code}
                                    onClick={() => setLang(l.code)}
                                    title={l.label}
                                    className={`w-6 h-4 rounded-[2px] overflow-hidden transition-all duration-300 flex items-center justify-center ${lang === l.code
                                        ? 'grayscale-0 opacity-100 ring-2 ring-accent ring-offset-2 scale-110'
                                        : 'grayscale opacity-40'
                                        }`}
                                >
                                    <img src={l.flag} alt={l.label} className="w-full h-full object-cover border border-zinc-200" />
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
                    </div>
                    <div className="p-6 border-b border-zinc-100">
                        <div className="flex items-center bg-zinc-100 rounded-sm px-4 py-3">
                            <Search size={18} className="text-muted mr-3" />
                            <input
                                type="text"
                                placeholder={t('search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && searchQuery.trim()) {
                                        setIsMobileMenuOpen(false);
                                        window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                                    }
                                }}
                                className="bg-transparent border-none text-sm focus:outline-none flex-1"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col p-6 space-y-8">
                        {mainCategories.map((cat) => (
                            <div key={cat.id} className="space-y-4">
                                <Link
                                    href={`/products?category=${cat.id}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-xl font-bold uppercase tracking-tight block border-b pb-2 border-zinc-100"
                                >
                                    {cat.label}
                                </Link>
                                <div className="grid grid-cols-2 gap-2 pl-4">
                                    {subCategories.map(sub => (
                                        <Link
                                            key={sub.id}
                                            href={`/products?category=${cat.id}&type=${sub.id}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-xs font-semibold text-muted py-1"
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="pt-4 border-t border-zinc-100 flex flex-col space-y-4">
                            <Link href="/store-locator" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-tight text-muted hover:text-accent transition-colors">
                                {t('storeLocator')}
                            </Link>
                            <Link href="/help" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-tight text-muted hover:text-accent transition-colors">
                                {t('help')}
                            </Link>
                        </div>
                        <Link href="/products" className="text-xl font-bold uppercase tracking-tight text-accent pt-4 border-t">{t('viewAll')}</Link>
                        {user && (
                            <button onClick={handleLogout} className="text-left text-lg font-bold uppercase tracking-tight text-red-500">{t('logout')}</button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
