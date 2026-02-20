'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { useDemo } from '@/context/DemoContext';
import { Search, Filter, ArrowRight, X, ChevronDown } from 'lucide-react';

const ProductsList = () => {
    const { t } = useDemo();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category');
    const activeType = searchParams.get('type');
    const urlSearch = searchParams.get('search');
    const [searchQuery, setSearchQuery] = useState(urlSearch || '');
    const [sortBy, setSortBy] = useState(t('sortFeatured'));
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

        if (sortBy === t('sortPriceLowHigh')) {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === t('sortPriceHighLow')) {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [activeCategory, activeType, searchQuery, sortBy]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-12">
            {/* Breadcrumbs & Title */}
            <section className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted">
                    <Link href="/" className="hover:text-accent transition-colors">{t('home')}</Link>
                    <span>/</span>
                    <Link href="/products" className={!activeCategory ? 'text-accent' : 'hover:text-accent transition-colors'}>{t('collection')}</Link>
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
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter uppercase italic underline decoration-accent/10">
                        {searchQuery ? `${t('search')} : ${searchQuery}` : (activeType ? `${t(activeType.toLowerCase() as any)} for ${activeCategory ? t(activeCategory.toLowerCase() as any) : 'Everyone'}` : (activeCategory === 'All' || !activeCategory ? t('collection') : t(activeCategory.toLowerCase() as any)))}
                    </h1>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-full w-fit">
                        {filteredProducts.length} Items Found
                    </span>
                </div>
            </section>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
                {/* Sidebar Filters (Desktop) / Mobile Toggle */}
                <aside className="lg:w-64 flex-shrink-0 space-y-10 hidden lg:block border-r border-zinc-100 pr-8">
                    <div className="space-y-6">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent border-b border-accent/20 pb-2">{t('collections')}</h3>
                        <div className="flex flex-col space-y-3">
                            {mainCategories.map(cat => (
                                <Link
                                    key={cat.id}
                                    href={cat.id === 'All' ? '/products' : `/products?category=${cat.id}${activeType ? `&type=${activeType}` : ''}`}
                                    className={`text-sm font-semibold transition-all duration-300 ${(activeCategory === cat.id || (!activeCategory && cat.id === 'All'))
                                        ? 'text-accent ml-2 border-l-2 border-accent pl-3'
                                        : 'text-muted hover:text-accent hover:pl-2'
                                        }`}
                                >
                                    {cat.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent border-b border-accent/20 pb-2">{t('category')}</h3>
                        <div className="flex flex-col space-y-3">
                            <Link
                                href={`/products${activeCategory ? `?category=${activeCategory}` : ''}`}
                                className={`text-sm font-semibold transition-all duration-300 ${!activeType ? 'text-accent ml-2 border-l-2 border-accent pl-3' : 'text-muted hover:text-accent hover:pl-2'}`}
                            >
                                {t('viewAll')}
                            </Link>
                            {subCategories.map(sub => (
                                <Link
                                    key={sub.id}
                                    href={`/products?type=${sub.id}${activeCategory ? `&category=${activeCategory}` : ''}`}
                                    className={`text-sm font-semibold transition-all duration-300 ${activeType === sub.id
                                        ? 'text-accent ml-2 border-l-2 border-accent pl-3'
                                        : 'text-muted hover:text-accent hover:pl-2'
                                        }`}
                                >
                                    {sub.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {(activeCategory || activeType || searchQuery) && (
                        <div className="pt-6 border-t border-zinc-100">
                            <button
                                onClick={() => window.location.href = '/products'}
                                className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                            >
                                <X size={14} />
                                <span>{t('clearFilters')}</span>
                            </button>
                        </div>
                    )}
                </aside>

                {/* Mobile Filter Scrollable */}
                <div className="lg:hidden flex overflow-x-auto pb-4 gap-3 no-scrollbar border-b border-zinc-100 -mx-4 px-4 sticky top-16 bg-white z-10 py-4">
                    <button
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        className="flex items-center space-x-2 px-4 py-2 bg-zinc-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest flex-shrink-0"
                    >
                        <Filter size={14} />
                        <span>{t('filters')}</span>
                    </button>
                    {mainCategories.map(cat => (
                        <Link
                            key={cat.id}
                            href={cat.id === 'All' ? '/products' : `/products?category=${cat.id}`}
                            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex-shrink-0 border transition-all ${(activeCategory === cat.id || (!activeCategory && cat.id === 'All'))
                                ? 'bg-accent border-accent text-white shadow-lg'
                                : 'bg-white border-zinc-200 text-muted'
                                }`}
                        >
                            {cat.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Filter Modal */}
                {isMobileFilterOpen && (
                    <div className="fixed inset-0 z-[100] bg-white lg:hidden">
                        <div className="p-6 border-b flex justify-between items-center shadow-sm sticky top-0 bg-white">
                            <h2 className="text-xl font-bold uppercase italic tracking-tighter">{t('filters')}</h2>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="p-2"><X size={24} /></button>
                        </div>
                        <div className="p-8 space-y-10 overflow-y-auto h-[calc(100vh-80px)]">
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{t('collections')}</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {mainCategories.map(cat => (
                                        <Link
                                            key={cat.id}
                                            href={cat.id === 'All' ? '/products' : `/products?category=${cat.id}`}
                                            onClick={() => setIsMobileFilterOpen(false)}
                                            className={`p-4 border text-[10px] font-bold uppercase tracking-widest text-center transition-all ${(activeCategory === cat.id || (!activeCategory && cat.id === 'All'))
                                                ? 'bg-accent border-accent text-white'
                                                : 'border-zinc-100 text-muted'
                                                }`}
                                        >
                                            {cat.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{t('category')}</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {subCategories.map(sub => (
                                        <Link
                                            key={sub.id}
                                            href={`/products?type=${sub.id}${activeCategory ? `&category=${activeCategory}` : ''}`}
                                            onClick={() => setIsMobileFilterOpen(false)}
                                            className={`p-4 border text-[10px] font-bold uppercase tracking-widest text-center transition-all ${activeType === sub.id
                                                ? 'bg-accent border-accent text-white'
                                                : 'border-zinc-100 text-muted'
                                                }`}
                                        >
                                            {sub.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Grid Area */}
                <div className="flex-1 space-y-8 lg:space-y-10">
                    {/* Top Bar - Inline Desktop / Scrollable Mobile Sort */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-6 border-b border-zinc-50">
                        <div className="relative w-full sm:w-80 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-accent" size={14} />
                            <input
                                type="text"
                                placeholder={t('search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 sm:py-2 bg-zinc-50 border border-zinc-100 rounded-sm text-xs font-bold focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
                            />
                        </div>
                        <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{t('sort')}</span>
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-transparent text-[11px] font-bold uppercase tracking-widest focus:outline-none border-b border-accent pb-1 pr-8 cursor-pointer"
                                >
                                    <option>Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-0 top-1 text-accent pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Responsive Grid: 2 columns on mobile, 3 on XL */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 sm:gap-x-10 gap-y-12 sm:gap-y-16 animate-fade-in-up">
                        {filteredProducts.map(product => (
                            <Link key={product.id} href={`/products/${product.id}`} className="group block space-y-3 sm:space-y-4 hover-lift p-2 -m-2 rounded-lg transition-all">
                                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 rounded-sm shadow-sm group-hover:shadow-xl transition-all">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[7px] sm:text-[9px] font-bold uppercase tracking-widest bg-white/95 backdrop-blur-sm px-2 sm:px-3 py-1 shadow-sm border border-zinc-100 w-fit text-black">
                                            {t(product.category.toLowerCase() as any)}
                                        </span>
                                        <span className="text-[7px] sm:text-[9px] font-bold uppercase tracking-widest bg-accent text-white px-2 sm:px-3 py-1 shadow-sm w-fit">
                                            {t(product.subCategory.toLowerCase() as any)}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-tight italic group-hover:text-accent transition-colors line-clamp-2">{product.name}</h3>
                                    <p className="text-xs sm:text-sm font-bold text-zinc-900 italic">Rp {product.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-24 text-center space-y-8 bg-zinc-50/50 rounded-sm border border-dashed border-zinc-200 animate-fade-in">
                            <div className="flex justify-center text-muted opacity-10">
                                <Search size={80} strokeWidth={1} />
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-2xl font-bold uppercase tracking-tighter italic">{t('noItemsFound')}</h2>
                                <p className="text-muted text-sm font-medium">{t('noItemsFoundDesc')}</p>
                            </div>
                            <button
                                onClick={() => window.location.href = '/products'}
                                className="bg-accent text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-dark-accent transition-all shadow-xl"
                            >
                                {t('resetCollection')}
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
        <Suspense fallback={
            <div className="p-24 text-center space-y-6 animate-pulse">
                <Filter size={48} className="mx-auto text-accent opacity-20" />
                <div className="font-bold uppercase tracking-[0.4em] text-muted text-xs">Synchronizing Boutique...</div>
            </div>
        }>
            <ProductsList />
        </Suspense>
    );
}
