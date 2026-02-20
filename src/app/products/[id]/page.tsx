'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { use } from 'react';
import { useDemo } from '@/context/DemoContext';
import { PRODUCTS, STORES, TESTIMONIALS } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { Check, MapPin, ShoppingCart, ArrowLeft, X, Star, Quote, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

const ProductDetailPage = ({ params }: PageProps) => {
    const { id } = use(params);
    const router = useRouter();
    const { addToCart, reserveProduct, trackView, user, t } = useDemo();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const product = PRODUCTS.find(p => p.id === id);

    // Randomize reviews for this product
    const productReviews = useMemo(() => {
        // Pick 2-3 random reviews
        const shuffled = [...TESTIMONIALS].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
    }, [id]);

    const averageRating = useMemo(() => {
        if (productReviews.length === 0) return 5;
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / productReviews.length).toFixed(1);
    }, [productReviews]);

    useEffect(() => {
        if (product) {
            trackView(product.id);
        }
    }, [product?.id]);

    if (!product) {
        return <div className="p-20 text-center font-bold uppercase tracking-widest">Product not found.</div>;
    }

    const handleAddToCart = () => {
        addToCart(product.id, selectedQuantity);
        alert(`${product.name} added to cart!`);
    };

    const handleReserve = (storeId: string, storeName: string) => {
        reserveProduct(product.id, storeId, storeName);
        setIsModalOpen(false);
        router.push('/reservation-confirmation');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
            <div className="flex flex-col lg:flex-row gap-20">
                <div className="lg:w-1/2 space-y-8">
                    <Link href="/products" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors">
                        <ArrowLeft size={16} className="mr-3" />
                        {t('collection')}
                    </Link>
                    <div className="premium-card overflow-hidden bg-zinc-100 shadow-2xl">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>

                <div className="lg:w-1/2 space-y-12">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                                <span>{t(product.category.toLowerCase() as any)}</span>
                                <span>/</span>
                                <span>{t(product.subCategory.toLowerCase() as any)}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-yellow-500">
                                <Star size={14} fill="currentColor" />
                                <span className="text-xs font-bold text-black">{averageRating}</span>
                                <span className="text-[10px] text-muted font-medium">({productReviews.length} Reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tighter uppercase italic leading-none underline decoration-accent/10">{product.name}</h1>
                        <p className="text-3xl font-bold text-accent">Rp {product.price.toLocaleString()}</p>
                    </div>

                    <p className="text-base text-muted font-medium leading-relaxed max-w-xl">
                        {product.description}
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-center space-x-6">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Quantity</span>
                            <div className="flex items-center border border-border">
                                <button onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))} className="px-4 py-2 hover:bg-zinc-50 border-r transition-colors">-</button>
                                <span className="px-8 py-2 font-bold text-sm">{selectedQuantity}</span>
                                <button onClick={() => setSelectedQuantity(selectedQuantity + 1)} className="px-4 py-2 hover:bg-zinc-50 border-l transition-colors">+</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="bg-accent text-white py-5 text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:opacity-90 transition-all flex items-center justify-center space-x-3"
                            >
                                <ShoppingCart size={20} />
                                <span>{t('addToBag')}</span>
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="border border-zinc-900 text-zinc-900 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white transition-all flex items-center justify-center space-x-3"
                            >
                                <MapPin size={20} />
                                <span>{t('reserveInStore')}</span>
                            </button>
                        </div>
                    </div>

                    {/* Store Availability */}
                    <div className="pt-12 border-t border-border space-y-8">
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{t('stockAvailability')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {STORES.map(store => {
                                const stock = product.stockPerStore.find(s => s.storeId === store.id)?.stock || 0;
                                return (
                                    <div key={store.id} className="flex flex-col space-y-1 p-4 bg-zinc-50 border border-zinc-100">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-[10px] uppercase tracking-widest">{store.name}</span>
                                            <div className={`w-2 h-2 rounded-full ${stock > 0 ? 'bg-green-500' : 'bg-red-400'}`} />
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-tight ${stock > 0 ? 'text-accent' : 'text-muted'}`}>
                                            {stock > 0 ? `${stock} Pieces left` : 'Out of stock'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <section className="space-y-12">
                <div className="flex items-center justify-between border-b pb-8">
                    <div className="flex items-center space-x-4">
                        <MessageSquare size={24} className="text-accent" />
                        <h2 className="text-3xl font-bold tracking-tighter uppercase italic">{t('customerReviews')}</h2>
                    </div>
                    <div className="flex items-center space-x-2 text-accent">
                        <Star size={20} fill="currentColor" />
                        <span className="text-2xl font-bold">{averageRating}</span>
                        <span className="text-xs font-bold text-muted uppercase tracking-widest ml-2">Verified Average</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {productReviews.map((review, idx) => (
                        <div key={idx} className="space-y-6 p-10 bg-zinc-50 border border-zinc-100 relative group transition-all hover:shadow-xl">
                            <Quote size={32} className="absolute top-6 left-6 text-accent opacity-10" />
                            <div className="flex justify-between items-start pl-8">
                                <div className="space-y-1">
                                    <div className="flex text-yellow-500 space-x-1">
                                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted">{review.date}</p>
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] bg-white px-3 py-1 border border-zinc-100 rounded-full">Verified Buyer</span>
                            </div>
                            <p className="text-lg italic font-medium leading-relaxed pl-8">"{review.content}"</p>
                            <div className="pl-8 pt-4 border-t border-zinc-200/50">
                                <span className="font-bold uppercase tracking-[0.3em] text-[10px] text-accent">— {review.user}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reservation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                    <div className="premium-card relative w-full max-w-lg p-12 space-y-10 shadow-3xl bg-white border-none">
                        <div className="flex justify-between items-center border-b border-zinc-100 pb-6">
                            <h2 className="text-3xl font-bold uppercase tracking-tighter italic">Select Store</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-accent transition-colors">
                                <X size={28} />
                            </button>
                        </div>
                        <p className="text-[11px] text-muted font-bold uppercase tracking-[0.2em] leading-relaxed">
                            Find a boutique near you for a personalized 24-hour fitting hold.
                        </p>
                        <div className="space-y-4">
                            {STORES.map(store => {
                                const stock = product.stockPerStore.find(s => s.storeId === store.id)?.stock || 0;
                                return (
                                    <button
                                        key={store.id}
                                        disabled={stock === 0}
                                        onClick={() => handleReserve(store.id, store.name)}
                                        className={`w-full flex justify-between items-center p-6 text-left border transition-all duration-300 ${stock > 0
                                                ? 'border-zinc-200 hover:border-accent hover:bg-zinc-50 hover:shadow-lg'
                                                : 'border-transparent opacity-30 cursor-not-allowed'
                                            }`}
                                    >
                                        <div>
                                            <p className="font-bold text-sm uppercase tracking-tighter italic">{store.name}</p>
                                            <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1 opacity-60">{store.location}</p>
                                        </div>
                                        {stock > 0 && <Check size={18} className="text-accent" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
