'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { useDemo } from '@/context/DemoContext';
import { Search, Filter, ArrowRight, X } from 'lucide-react';

const ProductsList = () => {
    const { t } = useDemo();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category');
    const activeType = searchParams.get('type');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Featured');

    const mainCategories = [
        { id: 'All', label: t('collection') },
        { id: 'Women', label: t('women') },
        { id: 'Men', label: t('men') },
        { id: 'Kids', label: t('kids') },
        { id: 'Accessories', label: t('accessories') },
        { id: 'Collections', label: t('collections') }
    ];

    const subCategories = [
        { id: 'Tops', label: t('tops') },
        { id: 'Bottoms', label: t('bottoms') },
        { id: 'Outerwear', label: t('outerwear') },
        { id: 'Innerwear', label: t('innerwear') },
        { id: 'Accessories', label: t('accessories') }
    ];

    const filteredProducts = useMemo(() => {
        let result = [...PRODUCTS];

        if (activeCategory && activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (activeType) {
            result = result.filter(p => p.subCategory === activeType);
        }

        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortBy === 'Price: Low to High') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'Price: High to Low') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [activeCategory, activeType, searchQuery, sortBy]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            <section className="space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href="/products" className={!activeCategory ? 'text-accent' : ''}>{t('collection')}</Link>
                    {activeCategory && activeCategory !== 'All' && (
                        <>
                            <span>/</span>
                            <span className={!activeType ? 'text-accent' : ''}>{t(activeCategory.toLowerCase() as any)}</span>
                        </>
                    )}
                    {activeType && (
                        <>
                            <span>/</span>
                            <span className="text-accent">{t(activeType.toLowerCase() as any)}</span>
                        </>
                    )}
                </div>
                <h1 className="text-4xl font-bold tracking-tighter uppercase italic underline decoration-accent/10">
                    {activeType ? `${t(activeType.toLowerCase() as any)} for ${activeCategory ? t(activeCategory.toLowerCase() as any) : 'Everyone'}` : (activeCategory === 'All' || !activeCategory ? t('collection') : t(activeCategory.toLowerCase() as any))}
                    <span className="ml-4 text-sm font-normal not-italic tracking-normal text-muted px-3 py-1 bg-zinc-100 rounded-full">
                        {filteredProducts.length} Items
                    </span>
                </h1>
            </section>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className="lg:w-64 flex-shrink-0 space-y-10">
                    <div className="space-y-6">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent border-b pb-2">{t('collection')}</h3>
                        <div className="flex flex-col space-y-3">
                            {mainCategories.map(cat => (
                                <Link
                                    key={cat.id}
                                    href={cat.id === 'All' ? '/products' : `/products?category=${cat.id}${activeType ? `&type=${activeType}` : ''}`}
                                    className={`text-sm font-semibold transition-colors ${(activeCategory === cat.id || (!activeCategory && cat.id === 'All'))
                                            ? 'text-accent ml-2 border-l-2 border-accent pl-2'
                                            : 'text-muted hover:text-accent'
                                        }`}
                                >
                                    {cat.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent border-b pb-2">Category</h3>
                        <div className="flex flex-col space-y-3">
                            <Link
                                href={`/products${activeCategory ? `?category=${activeCategory}` : ''}`}
                                className={`text-sm font-semibold transition-colors ${!activeType ? 'text-accent ml-2 border-l-2 border-accent pl-2' : 'text-muted hover:text-accent'}`}
                            >
                                {t('viewAll')}
                            </Link>
                            {subCategories.map(sub => (
                                <Link
                                    key={sub.id}
                                    href={`/products?type=${sub.id}${activeCategory ? `&category=${activeCategory}` : ''}`}
                                    className={`text-sm font-semibold transition-colors ${activeType === sub.id
                                            ? 'text-accent ml-2 border-l-2 border-accent pl-2'
                                            : 'text-muted hover:text-accent'
                                        }`}
                                >
                                    {sub.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Active Filters Summary */}
                    {(activeCategory || activeType || searchQuery) && (
                        <div className="pt-6 border-t border-border">
                            <button
                                onClick={() => window.location.href = '/products'}
                                className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-red-600 hover:opacity-70 transition-opacity"
                            >
                                <X size={14} />
                                <span>Clear Filters</span>
                            </button>
                        </div>
                    )}
                </aside>

                {/* Product Grid Area */}
                <div className="flex-1 space-y-10">
                    {/* Top Bar for Sorting/Search */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-6 border-b border-zinc-100">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={14} />
                            <input
                                type="text"
                                placeholder={t('search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-border rounded-sm text-xs font-medium focus:outline-none focus:border-accent transition-colors"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Sort By</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-[11px] font-bold uppercase tracking-widest focus:outline-none border-b border-accent pb-1"
                            >
                                <option>Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                        {filteredProducts.map(product => (
                            <Link key={product.id} href={`/products/${product.id}`} className="group block space-y-4">
                                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        <span className="text-[9px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm px-3 py-1 shadow-sm border border-zinc-100 w-fit">
                                            {t(product.category.toLowerCase() as any)}
                                        </span>
                                        <span className="text-[9px] font-bold uppercase tracking-widest bg-accent text-white px-3 py-1 shadow-sm w-fit">
                                            {t(product.subCategory.toLowerCase() as any)}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-sm font-bold uppercase tracking-tight italic group-hover:underline decoration-accent/20 transition-all">{product.name}</h3>
                                    <p className="text-sm font-medium">Rp {product.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center space-y-6 bg-zinc-50 rounded">
                            <div className="flex justify-center text-muted opacity-20">
                                <Search size={60} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold uppercase tracking-tighter">No results found</h2>
                                <p className="text-muted text-sm">Try adjusting your filters or search terms.</p>
                            </div>
                            <button
                                onClick={() => window.location.href = '/products'}
                                className="bg-accent text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                            >
                                {t('viewAll')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center font-bold uppercase tracking-widest animate-pulse">Synchronizing Collection...</div>}>
            <ProductsList />
        </Suspense>
    );
}
