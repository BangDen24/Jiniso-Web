'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { use } from 'react';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, STORES, TESTIMONIALS } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { Check, MapPin, ShoppingCart, ArrowLeft, X, Star, Quote, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

const ProductDetailPage = ({ params }: PageProps) => {
    const { id } = use(params);
    const router = useRouter();
    const { addToCart, reserveProduct, trackView, user, t } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    const product = PRODUCTS.find(p => p.id === id);

    // Randomize reviews for this product
    const productReviews = useMemo(() => {
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

    const nextImage = () => {
        setActiveImageIdx((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setActiveImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 sm:space-y-32">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-24">
                {/* Image Gallery Column */}
                <div className="lg:w-7/12 space-y-6">
                    <Link href="/products" className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors">
                        <ArrowLeft size={16} className="mr-3" />
                        {t('collection')}
                    </Link>

                    <div className="relative group">
                        <div className="premium-card overflow-hidden bg-zinc-100 aspect-[3/4] shadow-2xl relative">
                            <img
                                src={product.images[activeImageIdx]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-all duration-700 animate-fade-in"
                                key={activeImageIdx}
                            />

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="grid grid-cols-5 gap-3 sm:gap-4 scroll-m-2">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImageIdx(idx)}
                                className={`aspect-[3/4] overflow-hidden border-2 transition-all ${activeImageIdx === idx ? 'border-accent opacity-100 scale-95 shadow-lg' : 'border-transparent opacity-50 hover:opacity-80'
                                    }`}
                            >
                                <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info Column */}
                <div className="lg:w-5/12 space-y-10 sm:space-y-14">
                    <div className="space-y-6 sm:space-y-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                                <span className="hover:text-accent cursor-pointer transition-colors">{t(product.category.toLowerCase() as any)}</span>
                                <span>/</span>
                                <span className="hover:text-accent cursor-pointer transition-colors">{t(product.subCategory.toLowerCase() as any)}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-yellow-500 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100 w-fit text-nowrap">
                                    <Star size={14} fill="currentColor" />
                                    <span className="text-xs font-bold text-black">{averageRating}</span>
                                    <span className="text-[10px] text-muted font-medium">({productReviews.length} {t('customerReviews')})</span>
                                </div>
                                <div className="hidden sm:block h-4 w-[1px] bg-zinc-200" />
                                <div className="flex items-center space-x-2 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100 w-fit text-nowrap">
                                    <span className="text-xs font-bold text-black">{product.soldCount}+</span>
                                    <span className="text-[10px] text-muted font-medium uppercase tracking-wider">{t('productsSold')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase italic leading-tight underline decoration-accent/10">{product.name}</h1>
                            <p className="text-3xl sm:text-4xl font-bold text-accent italic">Rp {product.price.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="space-y-4 max-w-xl">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted border-b pb-2 w-fit">{t('description')}</h3>
                        <p className="text-base sm:text-lg text-muted font-medium leading-relaxed opacity-80">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-8 sm:space-y-10 bg-zinc-50/50 p-6 sm:p-10 border border-zinc-100 rounded-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">{t('selectQuantity')}</span>
                            <div className="flex items-center bg-white shadow-sm border border-zinc-200">
                                <button onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-zinc-50 border-r transition-colors text-lg font-bold">-</button>
                                <span className="w-16 h-12 flex items-center justify-center font-bold text-sm sm:text-base">{selectedQuantity}</span>
                                <button onClick={() => setSelectedQuantity(selectedQuantity + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-zinc-50 border-l transition-colors text-lg font-bold">+</button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-accent text-white py-5 sm:py-6 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-dark-accent transition-all flex items-center justify-center space-x-4 group shine-effect"
                            >
                                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                                <span>{t('addToBag')}</span>
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full border-2 border-zinc-900 text-zinc-900 py-5 sm:py-6 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] hover:bg-zinc-900 hover:text-white transition-all flex items-center justify-center space-x-4 group"
                            >
                                <MapPin size={20} className="group-hover:bounce transition-all" />
                                <span>{t('reserveInStore')}</span>
                            </button>
                        </div>

                        <p className="text-[10px] text-center text-muted font-bold uppercase tracking-widest opacity-60">
                            {t('freeShippingOnOrders')}
                        </p>
                    </div>

                    {/* Store Availability */}
                    <div className="pt-6 sm:pt-10 space-y-6 sm:space-y-8">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted flex items-center space-x-3">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full pulse-accent" />
                            <span>{t('stockAvailability')}</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {STORES.map(store => {
                                const stock = product.stockPerStore.find(s => s.storeId === store.id)?.stock || 0;
                                return (
                                    <div key={store.id} className="flex flex-col space-y-1.5 p-5 bg-white border border-zinc-100 shadow-sm hover:border-accent/30 transition-colors">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-[10px] uppercase tracking-widest text-black">{store.name}</span>
                                            <div className={`w-2 h-2 rounded-full ${stock > 0 ? 'bg-green-500' : 'bg-red-400'} ${stock > 0 ? 'animate-pulse' : ''}`} />
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-tight ${stock > 0 ? 'text-accent' : 'text-muted'}`}>
                                                {stock > 0 ? `${stock} ${t('piecesLeft')}` : t('outOfStock')}
                                            </span>
                                            <span className="text-[9px] text-muted opacity-40 uppercase font-bold tracking-widest">{t('storeInventory')}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <section className="space-y-12 sm:space-y-16">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 pb-10 gap-6">
                    <div className="flex items-center space-x-5">
                        <div className="bg-zinc-900 text-white p-4">
                            <MessageSquare size={28} />
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter uppercase italic">{t('customerReviews')}</h2>
                    </div>
                    <div className="flex items-center space-x-6 bg-zinc-50 px-8 py-5 rounded-sm border border-zinc-100 shadow-sm">
                        <div className="flex text-yellow-500">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} size={18} fill={i <= Math.round(Number(averageRating)) ? 'currentColor' : 'none'} className={i <= Math.round(Number(averageRating)) ? '' : 'text-zinc-200'} />
                            ))}
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-3xl font-bold italic">{averageRating}</span>
                            <div className="h-8 w-[1px] bg-zinc-300" />
                            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] max-w-[80px]">{t('verifiedConsensus')}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 lg:px-12">
                    {productReviews.map((review, idx) => (
                        <div key={idx} className="space-y-8 p-10 sm:p-14 bg-white border border-zinc-100 shadow-sm relative group transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-accent/10">
                            <Quote size={40} className="absolute top-8 left-8 text-accent opacity-5 group-hover:opacity-10 transition-opacity" />
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <div className="flex text-yellow-500 space-x-1.5">
                                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted/60">{review.date}</p>
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-[0.3em] bg-zinc-50 px-4 py-1.5 border border-zinc-200 rounded-full text-zinc-500">{t('verifiedBuyer')}</span>
                            </div>
                            <p className="text-xl sm:text-2xl italic font-medium leading-relaxed font-serif text-zinc-800">"{review.content}"</p>
                            <div className="pt-8 border-t border-zinc-100 flex items-center justify-between">
                                <span className="font-bold uppercase tracking-[0.4em] text-[11px] text-accent">— {review.user}</span>
                                <div className="flex items-center space-x-2 text-green-600">
                                    <Check size={12} />
                                    <span className="text-[9px] font-bold uppercase tracking-widest">{t('recommended')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reservation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
                    <div className="premium-card relative w-full max-w-xl p-8 sm:p-16 space-y-12 shadow-3xl bg-white border-none animate-fade-in-up">
                        <div className="flex justify-between items-center border-b border-zinc-100 pb-8">
                            <div className="space-y-2">
                                <h2 className="text-4xl font-bold uppercase tracking-tighter italic leading-none">{t('selectStore')}</h2>
                                <p className="text-[11px] text-muted font-bold uppercase tracking-[0.3em]">{t('chooseFittingDestination')}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-accent transition-all hover:rotate-90">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {STORES.map(store => {
                                const stock = product.stockPerStore.find(s => s.storeId === store.id)?.stock || 0;
                                return (
                                    <button
                                        key={store.id}
                                        disabled={stock === 0}
                                        onClick={() => handleReserve(store.id, store.name)}
                                        className={`w-full flex justify-between items-center p-8 text-left border-2 transition-all duration-500 rounded-sm ${stock > 0
                                            ? 'border-zinc-100 hover:border-accent hover:bg-zinc-50 hover:shadow-2xl hover:-translate-x-2'
                                            : 'border-transparent opacity-20 cursor-not-allowed grayscale'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-6">
                                            <MapPin size={24} className={stock > 0 ? 'text-accent' : 'text-muted'} />
                                            <div>
                                                <p className="font-bold text-lg uppercase tracking-tight italic text-zinc-900">{store.name}</p>
                                                <p className="text-[10px] text-muted font-bold uppercase tracking-[0.3em] mt-1.5 opacity-60">{store.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            {stock > 0 ? (
                                                <>
                                                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{stock} {t('inStock').toUpperCase()}</span>
                                                    <ChevronRight size={20} className="text-accent mt-2" />
                                                </>
                                            ) : (
                                                <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">{t('outOfStock').toUpperCase()}</span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <p className="text-[10px] text-center text-muted font-bold uppercase tracking-[0.2em] opacity-40 leading-relaxed">
                            {t('reservationHeld')}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
