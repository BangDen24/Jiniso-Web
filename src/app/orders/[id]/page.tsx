'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { PRODUCTS, STORES } from '@/lib/data';
import { ArrowLeft, Package, MapPin, Truck, CheckCircle2, Clock, CreditCard, ChevronRight, Calendar, Info, Sparkles } from 'lucide-react';

interface PageProps {
    params: Promise<{ id: string }>;
}

const OrderDetailPage = ({ params }: PageProps) => {
    const { id } = use(params);
    const { user, t } = useDemo();

    const order = user?.orders.find(o => o.id === id);

    if (!user || !order) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
                <div className="flex justify-center text-muted opacity-20">
                    <Info size={80} strokeWidth={1} />
                </div>
                <h1 className="text-3xl font-bold uppercase tracking-tighter italic">Order not found</h1>
                <Link href="/orders" className="bg-accent text-white px-8 py-4 inline-block font-bold uppercase tracking-widest text-xs shadow-xl">
                    Back to History
                </Link>
            </div>
        );
    }

    const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;
    const mainItem = order.items[0];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16 sm:space-y-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 border-b border-zinc-100 pb-10">
                <div className="space-y-6">
                    <Link href="/orders" className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.4em] text-muted hover:text-accent transition-all group">
                        <ArrowLeft size={16} className="mr-4 group-hover:-translate-x-2 transition-transform" />
                        {t('orderHistory')}
                    </Link>
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Transaction Receipt</p>
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase italic leading-none underline decoration-accent/10">
                            {t('orderDetail')} <span className="text-accent ml-2 sm:ml-4">#{order.id}</span>
                        </h1>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                    <span className={`w-full sm:w-auto text-center px-8 py-3 rounded-sm text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] shadow-xl ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-black text-white'
                        }`}>
                        {order.status}
                    </span>
                    <button className="flex-1 sm:flex-none px-8 py-3 bg-white border border-zinc-200 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors">
                        Invoice PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-20">
                <div className="lg:col-span-2 space-y-16 sm:space-y-24">
                    {/* Logistics Quick Overview */}
                    {mainItem?.courierName && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="premium-card p-6 sm:p-10 bg-zinc-50 border border-zinc-100 space-y-4 hover-lift">
                                <div className="flex items-center space-x-3 text-accent opacity-40">
                                    <Truck size={14} />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em]">{t('courier')}</span>
                                </div>
                                <p className="text-lg font-bold uppercase italic text-black leading-none">{mainItem.courierName}</p>
                            </div>
                            <div className="premium-card p-6 sm:p-10 bg-zinc-50 border border-zinc-100 space-y-4 hover-lift">
                                <div className="flex items-center space-x-3 text-accent opacity-40">
                                    <Calendar size={14} />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em]">{t('shippedOn')}</span>
                                </div>
                                <p className="text-lg font-bold uppercase italic text-black leading-none">{mainItem.shippedDate}</p>
                            </div>
                            <div className="premium-card p-6 sm:p-10 bg-accent text-white space-y-4 shadow-2xl pulse-accent hover-scale">
                                <div className="flex items-center space-x-3 opacity-60">
                                    <Clock size={14} />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em]">{t('estimatedArrival')}</span>
                                </div>
                                <p className="text-lg font-bold uppercase italic leading-none">{mainItem.estimatedArrival}</p>
                            </div>
                        </div>
                    )}

                    {/* PAYMENT TIMELINE */}
                    <section className="space-y-12 sm:space-y-16 animate-fade-in-up">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-100 pb-8">
                            <div className="flex items-center space-x-5">
                                <div className="bg-zinc-100 p-4 rounded-sm">
                                    <CreditCard size={24} className="text-accent" />
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tighter italic">{t('paymentProcess')}</h2>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2 bg-zinc-50 border border-zinc-200 w-fit">{order.paymentMethod || 'Virtual Account'}</span>
                        </div>
                        {order.paymentTimeline ? (
                            <div className="space-y-10 relative pt-4 ml-4 sm:ml-6">
                                <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-zinc-100" />
                                {order.paymentTimeline.map((step, idx) => (
                                    <div key={idx} className="flex gap-8 sm:gap-12 relative group tracking-step-hover p-4 sm:p-6 rounded-sm">
                                        <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ring-[6px] ring-white shadow-xl transition-all duration-500 ${idx === 0 ? 'bg-green-500 text-white scale-110' : 'bg-zinc-200 text-muted opacity-40'
                                            }`}>
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <h3 className={`text-base font-bold uppercase tracking-[0.2em] italic ${idx === 0 ? 'text-black' : 'text-muted/50'}`}>
                                                    {step.status}
                                                </h3>
                                                <span className="text-[9px] font-bold text-muted/40 uppercase tracking-[0.3em] bg-zinc-50/50 px-3 py-1 rounded-full border border-zinc-100">{step.date}</span>
                                            </div>
                                            <p className="text-xs sm:text-sm font-medium text-muted leading-relaxed italic opacity-60 max-w-lg">"{step.description}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </section>

                    {/* LOGISTICS TIMELINE */}
                    <section className="space-y-12 sm:space-y-16 animate-fade-in-up delay-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-100 pb-8 gap-6">
                            <div className="flex items-center space-x-5">
                                <div className="bg-black p-4 rounded-sm text-white">
                                    <Truck size={24} />
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-tighter italic">{t('trackingTimeline')}</h2>
                            </div>
                            {mainItem?.courierName && (
                                <div className="bg-zinc-50 px-6 py-3 border border-zinc-100 shadow-sm rounded-sm">
                                    <p className="text-[9px] font-bold text-muted/60 uppercase tracking-widest mb-1">Global Tracking ID</p>
                                    <p className="text-[11px] font-bold text-accent tracking-[0.3em]">JNS-{order.id.split('-')[1]}00{id.length}</p>
                                </div>
                            )}
                        </div>

                        {order.items[0]?.tracking ? (
                            <div className="space-y-10 relative pt-4 ml-4 sm:ml-6">
                                <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-zinc-100" />
                                {order.items[0].tracking.map((step, idx) => (
                                    <div key={idx} className="flex gap-8 sm:gap-12 relative group tracking-step-hover p-4 sm:p-6 rounded-sm">
                                        <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ring-[6px] ring-white shadow-xl transition-all duration-700 ${idx === 0 ? 'bg-accent text-white scale-125 pulse-accent' : 'bg-zinc-200 text-muted opacity-40 group-hover:opacity-100'
                                            }`}>
                                            {idx === 0 ? <Truck size={16} /> : <Clock size={16} />}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <h3 className={`text-base font-bold uppercase tracking-[0.2em] italic ${idx === 0 ? 'text-accent' : 'text-muted/50'}`}>
                                                    {step.status}
                                                </h3>
                                                <span className="text-[9px] font-bold text-muted/40 uppercase tracking-[0.3em] bg-zinc-50/50 px-3 py-1 rounded-full border border-zinc-100">{step.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-accent/60">
                                                <MapPin size={12} className="text-accent/30" />
                                                <span className="border-b border-accent/10">{step.location}</span>
                                            </div>
                                            <p className="text-xs sm:text-sm font-medium text-muted leading-relaxed italic opacity-60 max-w-lg">"{step.description}"</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </section>

                    {/* Order Items */}
                    <section className="space-y-10">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-muted border-b border-zinc-100 pb-6 flex items-center justify-between">
                            <span>Manifest Recap</span>
                            <span className="bg-zinc-100 px-3 py-1 rounded-full text-[9px]">{order.items.length} Items</span>
                        </h2>
                        <div className="space-y-8 sm:space-y-10">
                            {order.items.map((item, idx) => {
                                const product = PRODUCTS.find(p => p.id === item.productId);
                                return (
                                    <div key={idx} className="flex flex-col sm:flex-row gap-6 sm:gap-10 group relative">
                                        <div className="w-full sm:w-32 aspect-[3/4] sm:aspect-auto sm:h-44 bg-zinc-100 shadow-xl overflow-hidden flex-shrink-0 border border-zinc-100 hover-scale transition-all">
                                            <img src={product?.image} alt={product?.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-2">
                                            <div className="space-y-4">
                                                <div className="space-y-1">
                                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent/60">{product?.category}</span>
                                                    <h3 className="text-2xl font-bold uppercase tracking-tighter italic group-hover:text-accent transition-colors underline decoration-accent/10">{product?.name}</h3>
                                                </div>
                                                <div className="flex items-center space-x-6">
                                                    <div className="bg-zinc-50 px-4 py-1.5 border border-zinc-100 flex items-center space-x-3">
                                                        <span className="text-[10px] font-bold text-muted uppercase">{t('qty')}</span>
                                                        <span className="text-xs font-bold">{item.quantity}</span>
                                                    </div>
                                                    <div className="bg-zinc-50 px-4 py-1.5 border border-zinc-100 flex items-center space-x-3">
                                                        <span className="text-[10px] font-bold text-muted uppercase">Unit</span>
                                                        <span className="text-xs font-bold">Rp {item.price.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-end mt-8">
                                                <div className="space-y-1">
                                                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest leading-none">Line Total</p>
                                                    <p className="text-2xl font-bold text-accent italic tracking-tight">Rp {(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                                {item.courierName && (
                                                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">
                                                        <Truck size={12} />
                                                        <span className="text-[9px] font-bold uppercase tracking-widest">{item.courierName} Active</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                <div className="space-y-12 lg:sticky lg:top-24 h-fit">
                    <div className="premium-card p-10 bg-zinc-900 text-white shadow-3xl space-y-10 relative overflow-hidden group hover-lift">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                            <CreditCard size={150} />
                        </div>
                        <div className="flex items-center justify-between border-b border-white/10 pb-6 text-accent relative z-10">
                            <div className="flex items-center space-x-4">
                                <Sparkles size={20} className="animate-pulse" />
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.4em]">{t('summary')}</h3>
                            </div>
                        </div>
                        <div className="space-y-8 relative z-10">
                            <div className="flex justify-between items-center group">
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">{t('subtotal')}</span>
                                <span className="font-bold text-lg italic tracking-tight">Rp {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">{t('shipping')}</span>
                                <div className="flex items-center space-x-3">
                                    <span className="text-[10px] font-bold text-white/30 line-through uppercase">Rp 50.000</span>
                                    <span className="text-accent uppercase font-bold text-[11px] tracking-[0.3em] bg-accent/10 px-3 py-1 rounded-full">FREE</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end border-t border-white/10 pt-10">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">{t('total')}</p>
                                    <p className="text-4xl font-bold tracking-tighter italic text-white leading-none">Rp {total.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-6 relative z-10">
                            <div className="p-6 bg-white/5 border border-white/10 flex flex-col space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-30">{t('paymentMethod')}</span>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-accent">{order.paymentMethod || 'Virtual Account'}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-green-400">
                                    <CheckCircle2 size={14} />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{t('paymentSuccess')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="premium-card p-10 bg-white border border-zinc-200 shadow-xl space-y-10 hover-lift group">
                        <div className="flex items-center space-x-4 border-b border-zinc-100 pb-6 text-muted group-hover:text-accent transition-colors">
                            <MapPin size={22} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-[11px] font-bold uppercase tracking-[0.4em]">{t('shippingAddress')}</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-lg font-bold uppercase italic text-black leading-none">{user.name}</p>
                                <p className="text-[10px] font-bold text-muted/60 uppercase tracking-widest">Primary Residence</p>
                            </div>
                            <div className="text-sm font-medium text-zinc-600 leading-relaxed space-y-2 font-serif opacity-80 group-hover:opacity-100 transition-opacity">
                                <p>Jl. Jenderal Sudirman No. 123</p>
                                <p>SCBD Lot 10, Jakarta Selatan</p>
                                <p>DKI Jakarta, 12190</p>
                            </div>
                        </div>
                        <button className="w-full py-4 border border-zinc-100 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-50 transition-colors">
                            Report Redirection
                        </button>
                    </div>

                    <div className="p-10 bg-zinc-50 border border-zinc-200/50 text-center space-y-8 group cursor-pointer hover:bg-white hover:border-accent hover:shadow-2xl transition-all duration-500 rounded-sm">
                        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform">
                            <Info size={24} className="text-accent" />
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">{t('help')}</h4>
                            <p className="text-xs text-muted font-medium leading-relaxed max-w-[200px] mx-auto">Concierge service is ready for any delivery or payment inquiries.</p>
                        </div>
                        <div className="pt-4 flex items-center justify-center space-x-3 text-accent text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity">
                            <span className="border-b border-accent/20">Open High-Priority Ticket</span>
                            <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
