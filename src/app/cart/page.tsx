'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { PRODUCTS } from '@/lib/data';
import { Trash2, ArrowLeft, CreditCard, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CartPage = () => {
    const { user, removeFromCart, checkout, t } = useDemo();
    const router = useRouter();

    if (!user || user.cartItems.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-8">
                <div className="flex justify-center text-accent opacity-20">
                    <ShoppingBag size={80} strokeWidth={1} />
                </div>
                <h1 className="text-3xl font-bold uppercase tracking-tighter italic">{t('bag')} is empty</h1>
                <p className="text-muted font-medium text-sm">Start adding some premium pieces to your collection.</p>
                <Link href="/products" className="bg-accent text-white px-10 py-4 font-bold uppercase tracking-widest inline-block shadow-lg hover:opacity-90 transition-opacity">
                    Browse Collection
                </Link>
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

    const total = cartDetails.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);

    const handleCheckout = () => {
        checkout();
        alert('Thank you for your order! This demo has transitioned your cart items to order history.');
        router.push('/orders');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold tracking-tighter uppercase italic underline decoration-accent/10 mb-12">{t('bag')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-10">
                    {cartDetails.map(item => (
                        <div key={item.productId} className="flex gap-8 pb-10 border-b border-zinc-100">
                            <Link href={`/products/${item.productId}`} className="w-24 h-32 flex-shrink-0 overflow-hidden bg-zinc-100 shadow-sm">
                                <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" />
                            </Link>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg uppercase tracking-tight italic">{item.product?.name}</h3>
                                        <p className="font-bold text-accent">Rp {((item.product?.price || 0) * item.quantity).toLocaleString()}</p>
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-2">Qty: {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.productId)}
                                    className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted hover:text-red-500 transition-colors w-fit pt-4"
                                >
                                    <Trash2 size={14} />
                                    <span>Remove Item</span>
                                </button>
                            </div>
                        </div>
                    ))}

                    <Link href="/products" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors">
                        <ArrowLeft size={16} className="mr-2" />
                        Continue Shopping
                    </Link>
                </div>

                {/* Summary Side */}
                <div className="lg:col-span-1">
                    <div className="premium-card p-10 bg-zinc-50 border border-zinc-100 shadow-sm sticky top-24">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-10 border-b pb-4">{t('bagSummary')}</h2>
                        <div className="space-y-6 text-xs font-semibold mb-10">
                            <div className="flex justify-between">
                                <span className="text-muted tracking-wider uppercase">Subtotal</span>
                                <span className="font-bold">Rp {total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted tracking-wider uppercase">Shipping</span>
                                <span className="text-red-600 uppercase font-bold tracking-[0.2em]">Free</span>
                            </div>
                            <div className="flex justify-between pt-6 border-t border-zinc-200 text-base font-bold text-accent">
                                <span className="uppercase tracking-widest">Total</span>
                                <span>Rp {total.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="bg-accent text-white w-full py-5 flex items-center justify-center space-x-3 text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:opacity-90 transition-opacity"
                        >
                            <CreditCard size={20} />
                            <span>Simulate Checkout</span>
                        </button>
                        <p className="text-[9px] text-center text-muted uppercase tracking-[0.2em] mt-6 font-bold opacity-60">
                            Secure Demo Checkout • No Real Payment
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
