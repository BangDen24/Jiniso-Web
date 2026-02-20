'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { PRODUCTS } from '@/lib/data';
import { User as UserIcon, Mail, Phone, Calendar, ShoppingCart, Eye, Package, MapPin, History } from 'lucide-react';

const AccountPage = () => {
    const { user, timeline, t } = useDemo();

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* Profile Section */}
                <div className="lg:col-span-1 space-y-12">
                    <section className="space-y-6">
                        <h1 className="text-4xl font-bold tracking-tighter uppercase italic underline decoration-accent/10">{t('account')}</h1>
                        <div className="premium-card p-10 space-y-8 bg-zinc-50/30 shadow-sm border border-zinc-100">
                            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white ring-8 ring-accent/5">
                                <UserIcon size={32} />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold uppercase tracking-tight italic">{user.name}</h2>
                                <div className="space-y-3 text-[11px] font-bold uppercase tracking-widest text-muted">
                                    <div className="flex items-center space-x-3">
                                        <Mail size={16} />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Phone size={16} />
                                        <span>{user.phone}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-white border border-border text-accent w-full py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-50 transition-all">Edit Details</button>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent border-b pb-2">{t('recentVisitHistory')}</h2>
                        <div className="space-y-4">
                            {user.visitHistory.map((visit, i) => (
                                <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                                    <span className="text-muted">{visit.action}</span>
                                    <span className="text-accent">{new Date(visit.date).toLocaleDateString()}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Journey Timeline Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between border-b pb-4">
                        <h2 className="text-2xl font-bold uppercase tracking-tighter italic">{t('journeyTimeline')}</h2>
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-zinc-900 text-white px-3 py-1 rounded-sm">Sync Live</span>
                    </div>

                    <div className="relative border-l-2 border-zinc-100 ml-4 mt-12 space-y-12 pb-10">
                        {timeline.length === 0 && (
                            <div className="pl-10 text-muted text-xs font-semibold uppercase italic tracking-wider">
                                No interactions recorded yet. Explore the shop to build your timeline.
                            </div>
                        )}
                        {timeline.map((event, index) => (
                            <div key={event.id} className="relative pl-10">
                                {/* Timeline Dot */}
                                <div className={`absolute -left-[18px] top-1 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm ${getEventColor(event.type)}`}>
                                    {getEventIcon(event.type)}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-accent">{event.type} Product</p>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted">{new Date(event.date).toLocaleDateString()} • {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <p className="text-sm font-medium">
                                        {event.type === 'viewed' && 'Browsed '}
                                        {event.type === 'cart' && 'Added '}
                                        {event.type === 'reserved' && 'Placed reservation for '}
                                        {event.type === 'purchased' && 'Successfully purchased '}
                                        <span className="font-bold uppercase italic text-accent">{event.productName}</span>
                                    </p>
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
