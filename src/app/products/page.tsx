'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import { useApp } from '@/context/AppContext';
import { Search, Filter, ArrowRight, X, ChevronDown } from 'lucide-react';

const ProductsList = () => {
    const { t } = useApp();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category');
    const activeType = searchParams.get('type');

    const filteredProducts = PRODUCTS.filter(product => {
        if (activeCategory && product.category !== activeCategory) return false;
        if (activeType && product.subCategory !== activeType) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-6 md:space-y-0">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter italic uppercase text-zinc-900 mb-2">
                            {activeCategory || 'All Collections'}
                        </h1>
                        <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase">
                            {filteredProducts.length} Premium Pieces Available
                        </p>
                    </div>

                    <div className="flex space-x-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                            <input
                                type="text"
                                placeholder={t('search')}
                                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 focus:border-zinc-900 focus:bg-white transition-all outline-none italic"
                            />
                        </div>
                        <button className="p-3 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100 mb-6 border border-zinc-100 shadow-sm transition-all group-hover:shadow-xl group-hover:border-zinc-200">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {product.isFeatured && (
                                    <div className="absolute top-4 left-4 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 italic">
                                        Signature Spec
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="p-3 bg-white text-zinc-900 shadow-lg border border-zinc-100">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-900">{product.name}</h3>
                                    <span className="font-bold text-sm italic">Rp {product.price.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">{product.subCategory}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="text-zinc-200 uppercase font-bold text-6xl italic tracking-tighter mb-4">No Match</div>
                        <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm mb-8">Try adjusting your filters</p>
                        <Link
                            href="/products"
                            className="inline-flex items-center space-x-3 text-zinc-900 font-bold uppercase tracking-[0.3em] text-[10px] border-b-2 border-zinc-900 pb-1"
                        >
                            <span>Clear All Filters</span>
                            <X size={12} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

const ProductsPage = () => {
    return (
        <Suspense fallback={
            <div className="p-24 text-center space-y-6 animate-pulse">
                <div className="text-4xl font-bold tracking-[0.2em] text-zinc-100 italic uppercase">JINISO</div>
                <p className="text-zinc-400 font-medium tracking-widest uppercase text-xs">Curating your experience...</p>
            </div>
        }>
            <ProductsList />
        </Suspense>
    );
};

export default ProductsPage;
