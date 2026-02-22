'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, TrackingStep } from '@/lib/data';
import { Package, Heart, RefreshCw, Sparkles, ChevronRight, Truck, MapPin, CheckCircle2, Clock, X, Search } from 'lucide-react';

const OrdersPage = () => {
    const { user, t } = useApp();
    const [selectedTracking, setSelectedTracking] = useState<TrackingStep[] | null>(null);
    const [trackingItemName, setTrackingItemName] = useState<string>('');
    const [trackingInfo, setTrackingInfo] = useState<{ courier?: string; arrival?: string; shipped?: string }>({});
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOrders = React.useMemo(() => {
        if (!user) return [];
        if (!searchQuery.trim()) return user.orders;

        const query = searchQuery.toLowerCase().trim();
        return user.orders.filter(order =>
            order.id.toLowerCase().includes(query) ||
            order.items.some(item => {
                const product = PRODUCTS.find(p => p.id === item.productId);
                return product?.name.toLowerCase().includes(query);
            })
        );
    }, [user, searchQuery]);

    if (!user || user.orders.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-8 animate-fade-in-up">
                <div className="bg-zinc-50 w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center mx-auto shadow-inner border border-zinc-100">
                    <Package size={60} className="text-accent opacity-20" strokeWidth={1} />
                </div>
                <div className="space-y-3">
                    <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tighter italic">{t('noOrders')}</h1>
                    <p className="text-muted font-medium text-sm sm:text-base max-w-sm mx-auto">{t('startPremiumJourney')}</p>
                </div>
                <Link href="/products" className="bg-accent text-white px-10 py-5 font-bold uppercase tracking-[0.2em] inline-block shadow-2xl hover:bg-dark-accent transition-all">
                    {t('startShopping')}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 sm:space-y-20">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tighter uppercase italic underline decoration-accent/10">{t('orderHistory')}</h1>

            <div className="space-y-12 sm:space-y-16 animate-fade-in-up">
                {/* Order Search Bar */}
                <div className="relative max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder={t('search')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-zinc-50 border border-zinc-200 rounded-sm text-sm font-bold focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-red-500 transition-colors p-2"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                    <div key={order.id} className="space-y-6 sm:space-y-10 animate-fade-in-up">
                        <div className="premium-card bg-zinc-50/50 overflow-hidden shadow-sm border border-zinc-100 transition-all hover-lift hover:bg-white">
                            <div className="p-6 sm:p-8 border-b border-zinc-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] bg-accent text-white px-3 py-1">ID: {order.id}</span>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 border rounded-full ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted flex items-center">
                                        <Clock size={12} className="mr-2" />
                                        {t('orderedOn')} {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <Link
                                    href={`/orders/${order.id}`}
                                    className="text-[10px] font-bold uppercase tracking-widest text-accent border border-accent/20 px-6 py-2.5 hover:bg-accent hover:text-white transition-all flex items-center group w-full sm:w-auto justify-center"
                                >
                                    <span>{t('fullDetails')}</span>
                                    <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            <div className="divide-y divide-zinc-100">
                                {order.items.map((item, idx) => {
                                    const product = PRODUCTS.find(p => p.id === item.productId);
                                    if (!product) return null;
                                    return (
                                        <div key={idx} className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-10 sm:items-center">
                                            <div className="w-20 sm:w-28 aspect-[3/4] overflow-hidden bg-zinc-100 flex-shrink-0 shadow-sm border border-zinc-100 hover-scale transition-all">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div className="space-y-1">
                                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent">{product.category}</span>
                                                    <h3 className="font-bold text-sm sm:text-base uppercase tracking-tight italic group-hover:text-accent transition-colors underline decoration-accent/10">{product.name}</h3>
                                                    <p className="text-xs font-bold text-muted uppercase tracking-[0.1em]">{t('qty')}: {item.quantity}</p>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                                    <p className="text-lg font-bold">Rp {item.price.toLocaleString()}</p>
                                                    {item.tracking && (
                                                        <button
                                                            onClick={() => openTracking(item, product.name)}
                                                            className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.3em] text-accent p-2 -m-2 hover:bg-accent/5 transition-all w-fit rounded-sm shine-effect"
                                                        >
                                                            <Truck size={16} />
                                                            <span className="border-b-2 border-accent/20">{t('quickTrack')}</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* After-Sales Section (Simulated) */}
                        {order.status === 'Delivered' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
                                <div className="p-6 bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-accent/20 hover:shadow-xl transition-all hover-lift">
                                    <h4 className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">
                                        <Heart size={16} className="pulse-accent" />
                                        <span>{t('careInstructions')}</span>
                                    </h4>
                                    <p className="text-xs font-medium text-muted leading-relaxed">{t('ensureLongevity')}</p>
                                </div>
                                <div className="p-6 bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-accent/20 hover:shadow-xl transition-all hover-lift">
                                    <h4 className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-4">
                                        <RefreshCw size={16} />
                                        <span>{t('support30Day')}</span>
                                    </h4>
                                    <p className="text-xs font-medium text-muted leading-relaxed">{t('expertAssist')}</p>
                                </div>
                                <div className="p-6 bg-accent text-white hover-lift shadow-lg">
                                    <h4 className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                                        <Sparkles size={16} />
                                        <span>{t('completeLook')}</span>
                                    </h4>
                                    <p className="text-xs font-medium leading-relaxed opacity-90">{t('unlockPairing')}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )) : (
                    <div className="py-24 text-center space-y-6 bg-zinc-50 border border-dashed border-zinc-200 rounded-lg animate-fade-in uppercase">
                        <Search size={60} className="mx-auto text-muted/20" strokeWidth={1} />
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold tracking-tighter italic">{t('noMatches')}</h3>
                            <p className="text-muted text-sm font-medium">{t('noOrdersFoundMatching')} "{searchQuery}"</p>
                        </div>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="text-xs font-bold tracking-[0.4em] text-accent underline mt-4 hover:opacity-70 transition-opacity"
                        >
                            {t('clearSearch')}
                        </button>
                    </div>
                )}
            </div>

            {/* Tracking Modal */}
            {selectedTracking && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-all" onClick={() => setSelectedTracking(null)} />
                    <div className="premium-card relative w-full max-w-2xl bg-white p-6 sm:p-12 space-y-10 shadow-3xl border-none max-h-[90vh] overflow-y-auto animate-fade-in-up">
                        <div className="flex justify-between items-start border-b border-zinc-100 pb-8">
                            <div className="space-y-3">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">{t('shipmentProgress')}</span>
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter uppercase italic leading-none">{trackingItemName}</h2>
                                {trackingInfo.courier && (
                                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest bg-zinc-50 px-3 py-1 border border-zinc-100 w-fit">{t('courierLabel')}: {trackingInfo.courier}</p>
                                )}
                            </div>
                            <button onClick={() => setSelectedTracking(null)} className="text-muted hover:text-accent transition-all p-2 hover:rotate-90">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="space-y-10 py-4">
                            {selectedTracking.map((step, idx) => (
                                <div key={idx} className="relative pl-10 group tracking-step-hover p-4 rounded-lg">
                                    {/* Vertical Line */}
                                    {idx < selectedTracking.length - 1 && (
                                        <div className="absolute left-[24.5px] top-10 bottom-[-40px] w-0.5 bg-zinc-100" />
                                    )}

                                    {/* Indicator Circle */}
                                    <div className={`absolute left-[16px] top-6 w-[20px] h-[20px] rounded-full border-2 bg-white z-10 transition-all duration-500 ${idx === 0
                                        ? 'border-accent scale-125 pulse-accent'
                                        : 'border-zinc-200 group-hover:border-accent/40'
                                        }`}>
                                        {idx === 0 && <div className="absolute inset-1 bg-accent rounded-full" />}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <p className={`text-base font-bold uppercase tracking-tight italic ${idx === 0 ? 'text-accent' : 'text-zinc-600 group-hover:text-black transition-colors'}`}>
                                                {step.status}
                                            </p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted bg-white/50 backdrop-blur-sm px-3 py-1 border border-zinc-100 rounded-full w-fit">
                                                {step.date}
                                            </p>
                                        </div>
                                        {step.location && (
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent/70 flex items-center">
                                                <MapPin size={12} className="mr-2" />
                                                {step.location}
                                            </p>
                                        )}
                                        <p className="text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed max-w-md italic opacity-0 sm:opacity-100 sm:group-hover:opacity-100 transition-opacity">
                                            "{step.description}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex items-center space-x-3">
                                <CheckCircle2 className="text-green-500" size={24} />
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted">{t('estimatedDelivery')}</p>
                                    <p className="font-bold text-sm tracking-tight">{trackingInfo.arrival || 'Calculated at Warehouse'}</p>
                                </div>
                            </div>
                            <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl">
                                {t('fullTrackingHistory')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
