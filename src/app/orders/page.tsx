'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { PRODUCTS, TrackingStep } from '@/lib/data';
import { Package, Heart, RefreshCw, Sparkles, ChevronRight, Truck, MapPin, CheckCircle2, Clock, X } from 'lucide-react';

const OrdersPage = () => {
    const { user, t } = useDemo();
    const [selectedTracking, setSelectedTracking] = useState<TrackingStep[] | null>(null);
    const [trackingItemName, setTrackingItemName] = useState<string>('');
    const [trackingInfo, setTrackingInfo] = useState<{ courier?: string; arrival?: string; shipped?: string }>({});

    if (!user || user.orders.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-8">
                <Package size={60} className="mx-auto text-accent opacity-20" strokeWidth={1} />
                <h1 className="text-3xl font-bold uppercase tracking-tighter italic">No orders yet</h1>
                <p className="text-muted font-medium text-sm">Explore our collection and start your journey.</p>
                <Link href="/products" className="bg-accent text-white px-10 py-4 font-bold uppercase tracking-widest inline-block shadow-lg hover:opacity-90 transition-opacity">
                    Start Shopping
                </Link>
            </div>
        );
    }

    const openTracking = (item: any, itemName: string) => {
        if (item.tracking) {
            setSelectedTracking(item.tracking);
            setTrackingItemName(itemName);
            setTrackingInfo({
                courier: item.courierName,
                arrival: item.estimatedArrival,
                shipped: item.shippedDate
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            <h1 className="text-4xl font-bold tracking-tighter uppercase italic underline decoration-accent/10">{t('orderHistory')}</h1>

            <div className="space-y-16">
                {user.orders.map((order) => (
                    <div key={order.id} className="space-y-10">
                        <div className="premium-card bg-zinc-50/50 overflow-hidden shadow-sm border border-zinc-100 transition-all hover:shadow-xl hover:bg-white">
                            <div className="p-8 border-b border-zinc-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                <div className="flex gap-12">
                                    <div>
                                        <p className="text-muted uppercase text-[9px] font-bold tracking-[0.2em] mb-2">{t('orderPlaced')}</p>
                                        <p className="text-sm font-bold">{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted uppercase text-[9px] font-bold tracking-[0.2em] mb-2">{t('orderId')}</p>
                                        <Link href={`/orders/${order.id}`} className="text-sm font-bold font-mono text-accent hover:underline">#{order.id}</Link>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <Link href={`/orders/${order.id}`} className="text-[10px] font-bold uppercase tracking-widest text-accent border-b border-accent pb-0.5 hover:opacity-70 transition-opacity">
                                        {t('orderDetail')}
                                    </Link>
                                    <span className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-accent text-white'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                {order.items.map((item, idx) => {
                                    const product = PRODUCTS.find(p => p.id === item.productId);
                                    return (
                                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-100/50 pb-8 last:border-none last:pb-0">
                                            <div className="flex gap-8">
                                                <div className="w-16 h-20 bg-zinc-100 shadow-sm overflow-hidden flex-shrink-0">
                                                    <img src={product?.image} alt={product?.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <Link href={`/products/${item.productId}`} className="text-sm font-bold uppercase tracking-tight italic hover:text-accent transition-all">{product?.name}</Link>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-1">Qty: {item.quantity}</p>
                                                    <p className="text-sm font-bold text-accent mt-2">Rp {item.price.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            {item.tracking && (
                                                <div className="flex flex-col sm:flex-row gap-3 self-start sm:self-center">
                                                    <button
                                                        onClick={() => openTracking(item, product?.name || '')}
                                                        className="flex items-center space-x-3 px-6 py-3 border border-zinc-900 text-zinc-900 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all shadow-sm"
                                                    >
                                                        <Truck size={14} />
                                                        <span>Quick Track</span>
                                                    </button>
                                                    <Link
                                                        href={`/orders/${order.id}`}
                                                        className="flex items-center space-x-3 px-6 py-3 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-lg"
                                                    >
                                                        <span>Full Details</span>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* After Sales Section per Order */}
                        {order.status === 'Delivered' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
                                <div className="premium-card p-10 space-y-4 border-t-4 border-t-accent bg-white shadow-sm transition-all hover:scale-[1.02]">
                                    <div className="flex items-center space-x-3 text-accent">
                                        <Heart size={18} />
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]">{t('careTips')}</h3>
                                    </div>
                                    <ul className="text-xs font-semibold text-muted space-y-3 leading-relaxed uppercase tracking-tight opacity-70">
                                        <li className="flex items-start gap-2"><span>•</span> <span>Wash inside out at 30°C</span></li>
                                        <li className="flex items-start gap-2"><span>•</span> <span>Air dry away from direct sun</span></li>
                                        <li className="flex items-start gap-2"><span>•</span> <span>Iron on low heat setting</span></li>
                                    </ul>
                                </div>

                                <div className="premium-card p-10 space-y-6 bg-zinc-900 text-white shadow-2xl transition-all hover:scale-[1.02]">
                                    <div className="flex items-center space-x-3 text-red-500">
                                        <RefreshCw size={18} />
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]">{t('shopRestock')}</h3>
                                    </div>
                                    <p className="text-xs font-medium leading-relaxed opacity-80 italic">
                                        "Still the same quality, now in 5 new seasonal hues. Complete your collection today."
                                    </p>
                                    <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500 flex items-center group pt-2 border-b border-transparent hover:border-red-500 w-fit transition-all">
                                        <span>{t('shopRestock')}</span>
                                        <ChevronRight size={14} className="ml-2 transition-transform group-hover:translate-x-2" />
                                    </button>
                                </div>

                                <div className="premium-card p-10 space-y-4 bg-white border border-zinc-100 shadow-sm transition-all hover:scale-[1.02]">
                                    <div className="flex items-center space-x-3 text-accent">
                                        <Sparkles size={18} />
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]">Curated Look</h3>
                                    </div>
                                    <p className="text-xs font-medium leading-relaxed text-muted opacity-80">
                                        Based on your style, we suggest pairing this with our Premium Linen Collection.
                                    </p>
                                    <Link href="/products" className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent flex items-center group pt-4 underline decoration-accent/20">
                                        <span>{t('viewRelated')}</span>
                                        <ChevronRight size={14} className="ml-2 transition-transform group-hover:translate-x-2" />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Tracking Modal */}
            {selectedTracking && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedTracking(null)} />
                    <div className="premium-card relative w-full max-w-2xl bg-white p-12 overflow-hidden shadow-3xl">
                        <div className="flex justify-between items-center border-b border-zinc-100 pb-8 mb-8">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{t('tracking')}</span>
                                <h2 className="text-3xl font-bold tracking-tighter uppercase italic">{trackingItemName}</h2>
                            </div>
                            <button onClick={() => setSelectedTracking(null)} className="text-muted hover:text-accent transition-colors">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="space-y-10 relative">
                            {/* Logistics Detail Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-sm">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted mb-1">{t('courier')}</p>
                                    <p className="text-xs font-bold uppercase italic text-black">{trackingInfo.courier}</p>
                                </div>
                                <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-sm">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted mb-1">{t('shippedOn')}</p>
                                    <p className="text-xs font-bold uppercase italic text-black">{trackingInfo.shipped}</p>
                                </div>
                                <div className="p-4 bg-accent text-white rounded-sm shadow-md">
                                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-80 mb-1">{t('estimatedArrival')}</p>
                                    <p className="text-xs font-bold uppercase italic">{trackingInfo.arrival}</p>
                                </div>
                            </div>

                            {/* Vertical Line */}
                            <div className="absolute left-[15px] top-[140px] bottom-2 w-0.5 bg-zinc-100" />

                            {selectedTracking.map((step, idx) => (
                                <div key={idx} className="flex gap-10 relative">
                                    <div className={`z-10 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm ${idx === 0 ? 'bg-accent text-white' : 'bg-zinc-100 text-muted opacity-60'
                                        }`}>
                                        {idx === 0 ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h3 className={`text-sm font-bold uppercase tracking-widest ${idx === 0 ? 'text-black' : 'text-muted/60'}`}>
                                                {step.status}
                                            </h3>
                                            <span className="text-[10px] font-bold text-muted/40 uppercase tracking-widest">{step.date}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-muted/80">
                                            <MapPin size={12} className="text-accent/40" />
                                            <span>{step.location}</span>
                                        </div>
                                        <p className="text-xs font-medium text-muted/60 leading-relaxed italic">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-zinc-100 text-center">
                            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted opacity-40">
                                Service Guaranteed by Jiniso Logistics
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
