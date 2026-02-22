'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { PRODUCTS } from '@/lib/data';
import { User as UserIcon, Mail, Phone, ShoppingCart, Eye, Package, MapPin, History, Sparkles, ChevronRight } from 'lucide-react';

const AccountPage = () => {
    const { user, timeline, t } = useApp();

    if (!user) {
        return <div className="p-20 text-center font-bold uppercase tracking-widest">{t('login')}</div>;
    }

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'viewed': return <Eye size={14} />;
            case 'cart': return <ShoppingCart size={14} />;
            case 'reserved': return <MapPin size={14} />;
            case 'purchased': return <Package size={14} />;
            default: return <History size={14} />;
        }
    };

    const getEventColor = (type: string) => {
        switch (type) {
            case 'viewed': return 'bg-zinc-100 text-muted';
            case 'cart': return 'bg-blue-50 text-blue-600';
            case 'reserved': return 'bg-orange-50 text-orange-600';
            case 'purchased': return 'bg-green-50 text-green-600';
            default: return 'bg-zinc-100 text-muted';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16">

                {/* Profile Section */}
                <div className="lg:col-span-1 space-y-10 sm:space-y-12 animate-fade-in-up">
                    <section className="space-y-6">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter uppercase italic underline decoration-accent/10">{t('account')}</h1>
                        <div className="premium-card p-8 sm:p-10 space-y-8 bg-zinc-50/50 shadow-sm border border-zinc-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <UserIcon size={120} />
                            </div>
                            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white ring-8 ring-accent/5 relative z-10 shadow-xl">
                                <UserIcon size={32} />
                            </div>
                            <div className="space-y-4 relative z-10">
                                <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight italic text-zinc-900">{user.name}</h2>
                                <div className="space-y-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-muted">
                                    <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-sm border border-zinc-200/50">
                                        <Mail size={14} className="text-accent" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 bg-white/50 p-2 rounded-sm border border-zinc-200/50">
                                        <Phone size={14} className="text-accent" />
                                        <span>{user.phone}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-white border border-zinc-200 text-accent w-full py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all shadow-sm relative z-10">
                                {t('editProfile')}
                            </button>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent border-b border-accent/20 pb-3 flex items-center justify-between">
                            <span>{t('recentVisitHistory')}</span>
                            <Sparkles size={14} />
                        </h2>
                        <div className="space-y-4">
                            {user.visitHistory.map((visit, i) => (
                                <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest p-4 bg-zinc-50/30 border-l-2 border-accent/20 hover:bg-white hover:border-accent transition-all">
                                    <span className="text-muted">{visit.action}</span>
                                    <span className="text-accent/60">{new Date(visit.date).toLocaleDateString()}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Journey Timeline Section */}
                <div className="lg:col-span-2 space-y-10 sm:space-y-12 animate-fade-in-up delay-100">
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                        <div className="space-y-1">
                            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tighter italic">{t('journeyTimeline')}</h2>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em]">{t('journeySequence')}</p>
                        </div>
                        <div className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full shadow-lg">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">{t('liveSync')}</span>
                        </div>
                    </div>

                    <div className="relative border-l-2 border-zinc-100 ml-5 mt-16 space-y-12 sm:space-y-16 pb-10">
                        {timeline.length === 0 && (
                            <div className="pl-12 py-10 bg-zinc-50 border border-dashed border-zinc-200 text-muted text-xs font-bold uppercase italic tracking-widest text-center">
                                {t('noInteractions')} <br />{t('startBrowsing')}
                            </div>
                        )}
                        {timeline.map((event, index) => (
                            <div key={event.id} className="relative pl-12 group">
                                {/* Timeline Dot */}
                                <div className={`absolute -left-[21px] top-1 w-10 h-10 rounded-full flex items-center justify-center ring-[6px] ring-white shadow-xl transition-all duration-500 group-hover:scale-110 ${getEventColor(event.type)}`}>
                                    {getEventIcon(event.type)}
                                </div>

                                <div className="space-y-3 p-6 bg-zinc-50/30 border border-transparent hover:border-zinc-200 hover:bg-white transition-all hover:shadow-2xl hover-lift rounded-sm">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent flex items-center space-x-3">
                                            <span>{event.type} {t('product')}</span>
                                            {event.type === 'purchased' && <Sparkles size={12} className="text-yellow-500" />}
                                        </p>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted/60 bg-white px-3 py-1 border border-zinc-100 rounded-full">
                                            {new Date(event.date).toLocaleDateString()} • {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-base sm:text-lg font-medium leading-tight">
                                        <span className="text-muted/70">
                                            {event.type === 'viewed' && t('browsed')}
                                            {event.type === 'cart' && t('added')}
                                            {event.type === 'reserved' && t('placedReservationFor')}
                                            {event.type === 'purchased' && t('successfullyPurchased')}
                                        </span>
                                        <span className="font-bold uppercase italic text-black ml-1 underline decoration-accent/20 group-hover:decoration-accent transition-all"> {event.productName}</span>
                                    </p>
                                    <div className="pt-4 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/products/${event.productId}`} className="text-[9px] font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors flex items-center space-x-2">
                                            <span>{t('viewProduct')}</span>
                                            <ChevronRight size={12} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccountPage;
