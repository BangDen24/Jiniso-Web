'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDemo } from '@/context/DemoContext';
import Script from 'next/script';
import { PRODUCTS, STORES, TESTIMONIALS } from '@/lib/data';
import { ArrowRight, ShoppingBag, Clock, MapPin, Sparkles, Star, Quote, ChevronRight } from 'lucide-react';

export default function Home() {
  const { user, login, t } = useDemo();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

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

      {/* Instagram Reels Section */}
      <section className="bg-white py-20 sm:py-32 overflow-hidden border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent font-mono">Join The Club</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter uppercase italic text-zinc-900 leading-none">
                @JINISO.ID ON GRAM
              </h2>
            </div>
            <a href="https://www.instagram.com/jiniso.id/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-900 pb-1 hover:text-accent hover:border-accent transition-all group">
              <span>Follow Us</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 animate-fade-in-up">
            {[
              'DU5Y2fFE1h0',
              'DUxyLc1jzbB',
              'DU8IKLbE6iK',
              'DU0H5vbEuuz'
            ].map((shortcode, idx) => (
              <div
                key={idx}
                className="bg-[#fafafa] sm:bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 w-full max-w-[326px] mx-auto flex justify-center items-center"
                dangerouslySetInnerHTML={{
                  __html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/${shortcode}/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/${shortcode}/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/${shortcode}/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Instagram</a></p></div></blockquote>`
                }}
              />
            ))}
          </div>
          <Script
            async
            src="//www.instagram.com/embed.js"
            strategy="lazyOnload"
            onLoad={() => {
              if (typeof window !== 'undefined' && (window as any).instgrm) {
                (window as any).instgrm.Embeds.process();
              }
            }}
          />
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
