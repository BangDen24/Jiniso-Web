'use client';

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { STORES } from '@/lib/data';
import { MapPin, Navigation, Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function StoreLocatorPage() {
    const { t } = useDemo();

    return (
        <div className="min-h-screen bg-zinc-50 pb-24">
            {/* Header */}
            <div className="bg-zinc-900 text-white pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1555529733-0e67056058e1?w=1600&auto=format&fit=crop&q=80"
                        alt="Store Interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-accent mb-4">
                        <MapPin size={14} />
                        <span>JINISO Boutiques</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter uppercase italic">
                        {t('storeLocator')}
                    </h1>
                    <p className="max-w-xl mx-auto text-zinc-400 font-medium tracking-wide">
                        {t('storeLocatorDesc')}
                    </p>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                    <Link href="/" className="hover:text-accent transition-colors">{t('home')}</Link>
                    <ChevronRight size={12} />
                    <span className="text-zinc-900">{t('storeLocator')}</span>
                </div>
            </div>

            {/* Stores Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
                    {STORES.map((store, index) => (
                        <div
                            key={store.id}
                            className="bg-white border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 group animate-fade-in-up"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Map Embed Container */}
                            <div className="w-full aspect-video bg-zinc-100 relative overflow-hidden group-hover:opacity-90 transition-opacity">
                                {store.mapUrl ? (
                                    <iframe
                                        src={store.mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
                                    ></iframe>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-muted">
                                        <MapPin size={32} className="opacity-20" />
                                    </div>
                                )}
                            </div>

                            {/* Store Details */}
                            <div className="p-8 sm:p-10 space-y-8">
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold tracking-tight uppercase italic group-hover:text-accent transition-colors">
                                        {store.name}
                                    </h3>
                                    <p className="text-sm font-medium text-muted leading-relaxed">
                                        {store.location}
                                    </p>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-zinc-100">
                                    <div className="flex items-center space-x-4 text-xs font-medium text-zinc-600">
                                        <Clock size={16} className="text-accent" />
                                        <span>Mon - Sun: 10:00 AM - 10:00 PM</span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-xs font-medium text-zinc-600">
                                        <Phone size={16} className="text-accent" />
                                        <span>+62 (021) xxxx-xxxx</span>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <a
                                        href={store.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center space-x-2 w-full py-4 border-2 border-zinc-900 text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all group/btn"
                                    >
                                        <Navigation size={14} className="group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                                        <span>{t('getDirections')}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
