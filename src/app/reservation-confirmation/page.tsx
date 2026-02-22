'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PRODUCTS, STORES } from '@/lib/data';

const ReservationConfirmationPage = () => {
    const { user, t } = useApp();

    const reservation = user && user.reservations.length > 0
        ? user.reservations[user.reservations.length - 1]
        : null;

    const product = reservation ? PRODUCTS.find(p => p.id === reservation.productId) : null;
    const store = reservation ? STORES.find(s => s.id === reservation.storeId) : null;

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-8">
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center text-accent ring-8 ring-zinc-50/50">
                    <CheckCircle size={40} strokeWidth={1.5} />
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-medium tracking-tight">{t('reservationConfirmed')}</h1>
                <p className="text-muted">{t('reservationConfirmedDesc')}</p>
            </div>

            {reservation && product && store && (
                <div className="premium-card p-8 text-left space-y-6">
                    <div className="flex items-start justify-between pb-6 border-b border-border">
                        <div className="flex items-center space-x-4">
                            <img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded" />
                            <div>
                                <h2 className="font-medium">{product.name}</h2>
                                <p className="text-sm text-muted">{t('ref')}: {reservation.productId}-{Date.now().toString().slice(-4)}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-1">{t('status')}</p>
                            <span className="text-xs px-2 py-1 bg-zinc-100 rounded underline decoration-accent/30">{t('awaitingPickup')}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin size={18} className="text-muted mt-0.5" />
                                <div>
                                    <p className="font-medium">{store.name}</p>
                                    <p className="text-muted text-xs leading-relaxed">{store.location}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <Calendar size={18} className="text-muted mt-0.5" />
                                <div>
                                    <p className="font-medium">{t('validUntil')}</p>
                                    <p className="text-muted text-xs leading-relaxed">
                                        {new Date(new Date(reservation.date).getTime() + 24 * 60 * 60 * 1000).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                <Link href="/" className="btn-primary px-8">
                    {t('goToHome')}
                </Link>
                <Link href="/products" className="btn-secondary px-8 flex items-center justify-center">
                    <span>{t('continueShopping')}</span>
                    <ArrowRight size={16} className="ml-2" />
                </Link>
            </div>
        </div>
    );
}; export default ReservationConfirmationPage;
