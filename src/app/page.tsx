'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import { PRODUCTS, STORES, TESTIMONIALS } from '@/lib/data';
import { ArrowRight, ShoppingBag, Clock, MapPin, Sparkles, Star, Quote, ChevronRight } from 'lucide-react';

export default function Home() {
  const { user, login, t } = useDemo();

  // Personalized Sections Logic
  const lastViewed = user && user.viewedProducts.length > 0
    ? PRODUCTS.find(p => p.id === user.viewedProducts[0])
    : null;

  const cartItems = user?.cartItems || [];
  const recentReservation = user && user.reservations.length > 0
    ? user.reservations[user.reservations.length - 1]
    : null;
  const reservationProduct = recentReservation
    ? PRODUCTS.find(p => p.id === recentReservation.productId)
    : null;
  const reservationStore = recentReservation
    ? STORES.find(s => s.id === recentReservation.storeId)
    : null;

  const recommendations = PRODUCTS.filter(p =>
    !user?.viewedProducts.includes(p.id)
  ).slice(0, 3);

  const featuredItems = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);

  const categories = [
    { name: t('women'), id: 'Women', img: 'https://images.unsplash.com/photo-1576905341935-422730623643?w=800&auto=format&fit=crop&q=60' },
    { name: t('men'), id: 'Men', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=60' },
    { name: t('accessories'), id: 'Accessories', img: 'https://images.unsplash.com/photo-1544816153-09730556637e?w=800&auto=format&fit=crop&q=60' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] sm:h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-6 sm:space-y-8">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] opacity-80 animate-fade-in-up">{t('seasonalCollection')}</span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter uppercase italic leading-[0.9] animate-fade-in-up delay-100">
            {t('lifeWearTitle')}
          </h1>
          <p className="max-w-xs sm:max-w-md text-sm sm:text-lg font-medium opacity-90 leading-relaxed animate-fade-in-up delay-200">
            {t('lifeWearDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up delay-300">
            <Link href="/products" className="bg-white text-black px-8 sm:px-10 py-4 sm:py-5 text-center font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-2xl shine-effect">
              {t('discover')}
            </Link>
            {!user && (
              <button onClick={login} className="border border-white/40 backdrop-blur-sm text-white px-8 sm:px-10 py-4 sm:py-5 font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                {t('login')}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Member Personalized Welcome (if logged in) */}
      {user && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="border border-zinc-200 p-8 sm:p-12 bg-zinc-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 sm:gap-10">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{t('memberHome')}</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter italic uppercase">{t('welcome')}, {user.name.split(' ')[0]}</h2>
              <p className="text-muted text-sm">{t('personalizedExperience')}</p>
            </div>
            <div className="flex flex-wrap gap-6 sm:gap-4">
              <Link href="/account" className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-accent border-b border-accent pb-1 hover:opacity-70 transition-opacity">
                <span>{t('journeyTimeline')}</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/orders" className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-accent border-b border-accent pb-1 hover:opacity-70 transition-opacity">
                <span>{t('tracking')}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{t('collection')}</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter uppercase italic">{t('featuredProducts')}</h2>
          </div>
          <Link href="/products" className="text-xs font-bold uppercase tracking-widest flex items-center space-x-2 text-accent border-b border-accent pb-1 hover:opacity-70 transition-opacity">
            <span>{t('viewAll')}</span>
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-10 animate-fade-in-up">
          {featuredItems.map(product => (
            <Link key={product.id} href={`/products/${product.id}`} className="group block space-y-3 sm:space-y-4 hover-lift p-2 -m-2 rounded-lg transition-all">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block">
                  <div className="bg-white p-3 shadow-lg rounded-full text-accent">
                    <ShoppingBag size={18} />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-muted">{product.category}</span>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight italic group-hover:text-accent transition-colors truncate">{product.name}</h3>
                <div className="flex justify-between items-center pt-1">
                  <p className="text-xs sm:text-sm font-bold">Rp {product.price.toLocaleString()}</p>
                  <div className="flex text-yellow-500 scale-75 origin-right">
                    <Star size={12} fill="currentColor" />
                    <span className="ml-1 text-[9px] sm:text-[10px] font-bold text-black">4.9</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Cards */}
      <section className="max-w-7xl mx-auto px-4 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map(cat => (
            <Link key={cat.id} href={`/products?category=${cat.id}`} className="relative group block h-[400px] sm:h-[600px] overflow-hidden hover-lift rounded-lg">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 sm:bottom-12 left-8 sm:left-12 space-y-4 sm:space-y-6">
                <h3 className="text-4xl sm:text-5xl font-bold text-white uppercase italic tracking-tighter leading-tight">{cat.name}</h3>
                <div className="flex items-center text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] border border-white/40 px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-white hover:text-black transition-all w-fit backdrop-blur-sm">
                  <span>{t('discover')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Community Voice / Reviews */}
      <section className="bg-zinc-900 py-20 sm:py-32 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-12 sm:space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent font-mono">{t('communityVoice')}</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter uppercase italic">{t('customerReviews')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-16 animate-fade-in-up">
            {TESTIMONIALS.map(testimonial => (
              <div key={testimonial.id} className="space-y-6 sm:space-y-8 flex flex-col items-center bg-white/5 p-8 sm:p-12 backdrop-blur-sm border border-white/10 relative hover-lift rounded-sm">
                <Quote size={32} className="absolute top-4 left-4 text-accent opacity-20" />
                <div className="flex text-yellow-500 space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-lg sm:text-xl italic font-medium leading-relaxed">"{testimonial.content}"</p>
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px] text-accent">— {testimonial.user}</span>
                  <p className="text-[8px] sm:text-[9px] text-white/40 uppercase tracking-widest">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Sidebar Style Sections (Only for user) */}
      {user && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 animate-fade-in-up">
          {/* Continue Viewing */}
          {lastViewed && (
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center space-x-3 text-muted">
                <Clock size={18} />
                <span>{t('recentlyBrowsed')}</span>
              </h2>
              <Link href={`/products/${lastViewed.id}`} className="premium-card group block overflow-hidden shadow-2xl bg-zinc-50 border-none transition-all hover-lift">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-5/12 aspect-[4/5] sm:aspect-auto sm:h-auto overflow-hidden">
                    <img
                      src={lastViewed.image}
                      alt={lastViewed.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-8 sm:p-12 flex flex-col justify-between md:w-7/12">
                    <div className="space-y-4 sm:space-y-6">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] bg-accent text-white px-4 py-1.5 w-fit block">{lastViewed.category}</span>
                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tighter uppercase italic underline decoration-accent/10 leading-none">{lastViewed.name}</h3>
                      <p className="text-muted text-sm leading-relaxed font-medium opacity-80 line-clamp-3">{lastViewed.description}</p>
                    </div>
                    <div className="pt-8 sm:pt-10 flex items-center text-accent text-[10px] font-bold uppercase tracking-[0.3em]">
                      <span>{t('revisit')}</span>
                      <ArrowRight size={18} className="ml-3 transition-transform group-hover:translate-x-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Bag and Reservation Shortcut */}
          <div className="space-y-8 sm:space-y-12">
            {cartItems.length > 0 && (
              <div className="premium-card p-8 sm:p-10 bg-accent text-white space-y-6 sm:space-y-8 shadow-2xl hover-lift">
                <div className="flex items-center justify-between">
                  <ShoppingBag size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-80">{t('bagSummary')}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-bold tracking-tighter italic">{cartItems.length} {t('items').toUpperCase()}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{t('readyForCheckout')}</p>
                </div>
                <Link href="/cart" className="bg-white text-accent w-full py-4 block text-center text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-100 transition-all">
                  {t('reviewCheckout')}
                </Link>
              </div>
            )}

            {recentReservation && (
              <div className="premium-card p-8 sm:p-10 space-y-5 sm:space-y-6 border-l-8 border-accent bg-white shadow-xl hover-lift">
                <div className="flex items-center space-x-3">
                  <MapPin size={20} className="text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{t('inStoreReservation')}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent">{t('readyForCollection')}</p>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tighter uppercase italic leading-none">{reservationProduct?.name}</h3>
                  <p className="text-[10px] font-bold text-muted opacity-80">{reservationStore?.name}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Recommended for You List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border pt-16 sm:pt-24 space-y-10 sm:space-y-12">
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tighter italic flex items-center space-x-3 text-muted">
          <Sparkles size={24} className="text-accent" />
          <span>{t('curatedSuggestions')}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 animate-fade-in-up">
          {recommendations.map(product => (
            <Link key={product.id} href={`/products/${product.id}`} className="flex gap-4 sm:gap-6 group hover-lift p-2 -m-2 rounded-lg transition-all">
              <div className="w-24 sm:w-32 h-32 sm:h-40 bg-zinc-100 overflow-hidden shadow-sm flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex flex-col justify-center space-y-2 border-b border-zinc-100 pb-4 flex-1">
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-muted">{product.category}</span>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight italic group-hover:text-accent transition-colors truncate">{product.name}</h3>
                <p className="text-xs sm:text-sm font-bold">Rp {product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
