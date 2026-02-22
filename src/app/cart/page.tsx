'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { PRODUCTS } from '@/lib/data';
import { Trash2, ArrowLeft, CreditCard, ShoppingBag, ChevronRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CartPage = () => {
    const { user, removeFromCart, checkout, t } = useApp();
    const router = useRouter();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);

    if (!user || user.cartItems.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32 text-center space-y-8 animate-fade-in-up">
                <div className="relative inline-block">
                    <div className="bg-zinc-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto shadow-inner border border-zinc-100">
                        <ShoppingBag size={80} strokeWidth={1} className="text-accent opacity-10" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ShoppingBag size={40} className="text-accent/20 animate-pulse" />
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tighter italic">{t('bagEmpty')}</h1>
                    <p className="text-muted font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em] max-w-xs mx-auto opacity-60">{t('collectionDesc')}</p>
                </div>
                <div className="pt-6">
                    <Link href="/products" className="bg-accent text-white px-12 py-5 font-bold uppercase tracking-[0.3em] inline-block shadow-2xl hover:bg-dark-accent transition-all shine-effect">
                        {t('discover')}
                    </Link>
                </div>
            </div>
        );
    }

    const cartDetails = user.cartItems.map(item => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        return {
            ...item,
            product,
        };
    }).filter(item => item.product);

    const subtotal = cartDetails.reduce((acc: number, item: any) => acc + (item.product?.price || 0) * item.quantity, 0);

    const handleCheckout = () => {
        setIsPaymentModalOpen(true);
    };

    const confirmPayment = () => {
        checkout();
        setIsPaymentModalOpen(false);
        router.push('/orders');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 sm:space-y-16">
            <div className="space-y-4">
                <div className="flex items-center space-x-3 text-accent animate-fade-in">
                    <ShoppingBag size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">{cartDetails.length} {t('itemsSelected')}</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase italic underline decoration-accent/10">{t('bag')}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-20">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-10 sm:space-y-12 animate-fade-in-up">
                    <div className="divide-y divide-zinc-100 border-t border-zinc-100">
                        {cartDetails.map((item: any) => (
                            <div key={item.productId} className="flex flex-col sm:flex-row gap-6 sm:gap-10 py-10 group relative">
                                <Link href={`/products/${item.productId}`} className="w-full sm:w-32 aspect-[3/4] sm:aspect-auto sm:h-44 flex-shrink-0 overflow-hidden bg-zinc-100 shadow-sm border border-zinc-100 hover-scale transition-all">
                                    <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                                </Link>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="space-y-1">
                                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent/60">{item.product?.category}</span>
                                                <h3 className="font-bold text-xl sm:text-2xl uppercase tracking-tighter italic group-hover:text-accent transition-colors leading-none">{item.product?.name}</h3>
                                            </div>
                                            <p className="font-bold text-lg sm:text-xl italic text-zinc-900">Rp {((item.product?.price || 0) * item.quantity).toLocaleString()}</p>
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <div className="flex items-center space-x-3 bg-zinc-50 px-4 py-2 border border-zinc-100">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{t('qty')}</span>
                                                <span className="text-sm font-bold text-zinc-900">{item.quantity}</span>
                                            </div>
                                            <span className="text-[9px] font-bold text-green-600 bg-green-50 px-3 py-1 uppercase tracking-widest border border-green-100 rounded-full">{t('inStock')}</span>
                                        </div>
                                    </div>
                                    <div className="pt-8 sm:pt-4">
                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted hover:text-red-500 transition-all p-2 -m-2 opacity-60 hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                            <span className="border-b border-transparent hover:border-red-500">{t('removeFromBag')}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 sm:pt-10">
                        <Link href="/products" className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.4em] text-muted hover:text-accent transition-all group">
                            <ArrowLeft size={18} className="mr-4 group-hover:-translate-x-3 transition-transform" />
                            <span>{t('continueShopping')}</span>
                        </Link>
                    </div>
                </div>

                {/* Summary Side */}
                <div className="lg:col-span-1 animate-fade-in-up delay-100">
                    <div className="premium-card p-8 sm:p-12 bg-white border-2 border-zinc-900 shadow-3xl sticky top-24 space-y-10">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold uppercase tracking-tighter italic border-b border-zinc-100 pb-4">{t('bagSummary')}</h2>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] pt-2">{t('intlOrders')}</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center group">
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted group-hover:text-black transition-colors">{t('subtotalWithItems').replace('{count}', cartDetails.length.toString())}</span>
                                <span className="font-bold text-lg italic tracking-tight">Rp {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted group-hover:text-black transition-colors">{t('standardShipping')}</span>
                                <div className="flex items-center space-x-3">
                                    <span className="text-[10px] font-bold text-muted line-through opacity-50 uppercase tracking-widest">Rp 50.000</span>
                                    <span className="text-accent uppercase font-bold text-[11px] tracking-[0.3em] bg-accent/5 px-3 py-1 rounded-full animate-pulse">{t('free')}</span>
                                </div>
                            </div>
                            <div className="pt-8 border-t border-zinc-100 flex justify-between items-center text-2xl font-bold text-zinc-900 italic">
                                <div className="flex items-center space-x-3">
                                    <span className="uppercase tracking-widest text-[11px] not-italic text-muted mb-0.5">{t('total')}</span>
                                    <div className="h-6 w-[1px] bg-zinc-200" />
                                </div>
                                <span className="tracking-tighter">Rp {subtotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <button
                                onClick={handleCheckout}
                                className="bg-zinc-900 text-white w-full py-6 flex items-center justify-center space-x-4 text-[11px] font-bold uppercase tracking-[0.4em] shadow-2xl hover:bg-black transition-all group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                <CreditCard size={20} className="relative z-10" />
                                <span className="relative z-10">{t('safeCheckout')}</span>
                                <ChevronRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <div className="flex items-center justify-center space-x-2 text-green-600">
                                <Sparkles size={14} className="animate-spin-slow" />
                                <span className="text-[9px] font-bold uppercase tracking-widest">{t('rewardsEligible')}</span>
                            </div>
                        </div>

                        <div className="pt-6 text-center space-y-4">
                            <p className="text-[9px] text-muted uppercase tracking-[0.3em] font-bold opacity-60 leading-relaxed">
                                {t('paymentSecurity')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Payment Modal */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-0">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsPaymentModalOpen(false)} />
                    <div className="bg-white max-w-lg w-full relative z-10 animate-fade-in-up border-4 border-zinc-900 shadow-3xl overflow-hidden">
                        <div className="bg-zinc-900 p-8 sm:p-10 text-white space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-accent rounded-full animate-pulse">
                                    <CreditCard size={24} className="text-white" />
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tighter italic">Payment Gateway</h2>
                            </div>
                            <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.2em]">{t('paymentSecurity')}</p>
                        </div>

                        <div className="p-8 sm:p-10 space-y-8">
                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em]">{t('paymentMethod')}</p>
                                <div className="p-6 bg-zinc-50 border border-zinc-100 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold uppercase tracking-tighter italic text-zinc-900">BCA Virtual Account</span>
                                        <div className="text-accent text-xs font-bold italic uppercase tracking-widest border-b border-accent/20">Official JINISO</div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted/60">Transfer Number</p>
                                        <p className="text-3xl font-bold tracking-tighter italic text-zinc-900 select-all">3901 0812 3456 7890</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em]">{t('total')}</p>
                                <p className="text-4xl font-bold tracking-tighter italic text-accent">Rp {subtotal.toLocaleString()}</p>
                            </div>

                            <div className="space-y-4 pt-4">
                                <button
                                    onClick={confirmPayment}
                                    className="w-full bg-accent text-white py-6 font-bold uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:bg-dark-accent transition-all relative group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <span className="relative z-10">Konfirmasi Pembayaran</span>
                                </button>
                                <button
                                    onClick={() => setIsPaymentModalOpen(false)}
                                    className="w-full py-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted hover:text-black transition-colors"
                                >
                                    Cancel Transaction
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
