'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { PRODUCTS, STORES } from '@/lib/data';
import { ArrowLeft, Package, MapPin, Truck, CheckCircle2, Clock, CreditCard, ChevronRight, Calendar, Info } from 'lucide-react';

interface PageProps {
    params: Promise<{ id: string }>;
}

const OrderDetailPage = ({ params }: PageProps) => {
    const { id } = use(params);
    const { user, t } = useDemo();

    const order = user?.orders.find(o => o.id === id);

    if (!user || !order) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold uppercase tracking-tighter italic">Order not found</h1>
                <Link href="/orders" className="text-accent underline mt-4 inline-block font-bold uppercase tracking-widest text-xs">Back to History</Link>
            </div>
        );
    }

    const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;
    const mainItem = order.items[0];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-zinc-100 pb-8">
                <div className="space-y-4">
                    <Link href="/orders" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors">
                        <ArrowLeft size={16} className="mr-3" />
                        {t('orderHistory')}
                    </Link>
                    <h1 className="text-5xl font-bold tracking-tighter uppercase italic leading-none underline decoration-accent/10">
                        {t('orderDetail')} <span className="text-accent ml-4">#{order.id}</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <span className={`px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-[0.2em] shadow-sm ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-accent text-white'
                        }`}>
                        {order.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-24">
                    {/* Logistics Quick Overview */}
                    {mainItem?.courierName && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="premium-card p-6 bg-zinc-50 border border-zinc-100 space-y-2">
                                <div className="flex items-center space-x-2 text-accent opacity-60">
                                    <Truck size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{t('courier')}</span>
                                </div>
                                <p className="text-sm font-bold uppercase italic text-black">{mainItem.courierName}</p>
                            </div>
                            <div className="premium-card p-6 bg-zinc-50 border border-zinc-100 space-y-2">
                                <div className="flex items-center space-x-2 text-accent opacity-60">
                                    <Calendar size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{t('shippedOn')}</span>
                                </div>
                                <p className="text-sm font-bold uppercase italic text-black">{mainItem.shippedDate}</p>
                            </div>
                            <div className="premium-card p-6 bg-accent text-white space-y-2 shadow-lg">
                                <div className="flex items-center space-x-2 opacity-80">
                                    <Clock size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{t('estimatedArrival')}</span>
                                </div>
                                <p className="text-sm font-bold uppercase italic">{mainItem.estimatedArrival}</p>
                            </div>
                        </div>
                    )}

                    {/* PAYMENT TIMELINE */}
                    <section className="space-y-10">
                        <div className="flex items-center space-x-4 border-b pb-4">
                            <CreditCard size={24} className="text-accent" />
                            <h2 className="text-2xl font-bold uppercase tracking-tighter italic">{t('paymentProcess')}</h2>
                        </div>
                        {order.paymentTimeline ? (
                            <div className="space-y-12 relative pt-6">
                                <div className="absolute left-[15px] top-8 bottom-8 w-0.5 bg-zinc-100" />
                                {order.paymentTimeline.map((step, idx) => (
                                    <div key={idx} className="flex gap-10 relative group">
                                        <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm transition-all ${idx === 0 ? 'bg-green-500 text-white scale-110' : 'bg-zinc-100 text-muted opacity-60'
                                            }`}>
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className={`text-sm font-bold uppercase tracking-[0.1em] ${idx === 0 ? 'text-black' : 'text-muted/60'}`}>
                                                    {step.status}
                                                </h3>
                                                <span className="text-[10px] font-bold text-muted/40 uppercase tracking-widest">{step.date}</span>
                                            </div>
                                            <p className="text-xs font-medium text-muted leading-relaxed italic opacity-70">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </section>

                    {/* LOGISTICS TIMELINE */}
                    <section className="space-y-10">
                        <div className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center space-x-4">
                                <Truck size={24} className="text-accent" />
                                <h2 className="text-2xl font-bold uppercase tracking-tighter italic">{t('trackingTimeline')}</h2>
                            </div>
                            {mainItem?.courierName && <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent font-mono">TRACKING ID: JNS-{order.id.split('-')[1]}00{id.length}</span>}
                        </div>

                        {order.items[0]?.tracking ? (
                            <div className="space-y-12 relative pt-6">
                                <div className="absolute left-[15px] top-8 bottom-8 w-0.5 bg-zinc-100" />
                                {order.items[0].tracking.map((step, idx) => (
                                    <div key={idx} className="flex gap-10 relative group">
                                        <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm transition-all ${idx === 0 ? 'bg-accent text-white scale-110' : 'bg-zinc-100 text-muted opacity-60 group-hover:opacity-100'
                                            }`}>
                                            {idx === 0 ? <Truck size={16} /> : <Clock size={16} />}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className={`text-sm font-bold uppercase tracking-[0.1em] ${idx === 0 ? 'text-black' : 'text-muted/60'}`}>
                                                    {step.status}
                                                </h3>
                                                <span className="text-[10px] font-bold text-muted/40 uppercase tracking-widest">{step.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-muted/80">
                                                <MapPin size={12} className="text-accent/40" />
                                                <span>{step.location}</span>
                                            </div>
                                            <p className="text-xs font-medium text-muted leading-relaxed italic opacity-70">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </section>

                    {/* Order Items */}
                    <section className="space-y-8">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted border-b pb-4">Items Ordered</h2>
                        <div className="space-y-6">
                            {order.items.map((item, idx) => {
                                const product = PRODUCTS.find(p => p.id === item.productId);
                                return (
                                    <div key={idx} className="flex gap-8 group">
                                        <div className="w-24 h-32 bg-zinc-100 shadow-sm overflow-hidden flex-shrink-0">
                                            <img src={product?.image} alt={product?.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-2">
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold uppercase tracking-tight italic group-hover:text-accent transition-colors">{product?.name}</h3>
                                                <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-muted">
                                                    <span>Qty: {item.quantity}</span>
                                                    <span>•</span>
                                                    <span>Rp {item.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <p className="text-lg font-bold text-accent">Rp {(item.price * item.quantity).toLocaleString()}</p>
                                                {item.courierName && <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-zinc-100 border border-zinc-200">{item.courierName}</span>}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                <div className="space-y-12">
                    <div className="premium-card p-10 bg-zinc-900 text-white shadow-2xl space-y-10 sticky top-24">
                        <div className="flex items-center space-x-3 border-b border-white/10 pb-4 text-accent">
                            <CreditCard size={18} />
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em]">{t('summary')}</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
                                <span>{t('subtotal')}</span>
                                <span>Rp {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60 text-red-400">
                                <span>{t('shipping')}</span>
                                <span>FREE</span>
                            </div>
                            <div className="flex justify-between text-2xl font-bold tracking-tighter italic border-t border-white/10 pt-6 text-white">
                                <span className="uppercase">{t('total')}</span>
                                <span>Rp {total.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="pt-6">
                            <div className="p-4 bg-white/5 border border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                                <span className="opacity-40">{t('paymentMethod')}</span>
                                <span className="text-accent">{order.paymentMethod || 'Virtual Account'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card p-10 bg-zinc-50 border border-zinc-100 shadow-sm space-y-8">
                        <div className="flex items-center space-x-3 border-b border-zinc-200 pb-4 text-muted">
                            <MapPin size={18} />
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em]">{t('shippingAddress')}</h3>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-bold uppercase italic text-black">{user.name}</p>
                            <div className="text-xs font-medium text-muted leading-relaxed space-y-1">
                                <p>Jl. Jenderal Sudirman No. 123</p>
                                <p>SCBD Lot 10, Jakarta Selatan</p>
                                <p>DKI Jakarta, 12190</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border border-zinc-200 text-center space-y-4 group cursor-pointer hover:border-accent transition-colors">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">{t('help')}</h4>
                        <p className="text-xs text-muted leading-relaxed">Having issues with your delivery or payment? Contact our support.</p>
                        <div className="flex items-center justify-center space-x-2 text-accent text-[9px] font-bold uppercase tracking-widest">
                            <span>Open Support Ticket</span>
                            <ChevronRight size={12} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
