'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, INITIAL_USER, TimelineEvent, INITIAL_TIMELINE, PRODUCTS, Product } from '@/lib/data';
import { Language, translations } from '@/lib/translations';

interface DemoContextType {
    user: User | null;
    timeline: TimelineEvent[];
    login: () => void;
    logout: () => void;
    addToCart: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    reserveProduct: (productId: string, storeId: string, storeName: string) => void;
    checkout: () => void;
    trackView: (productId: string) => void;
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: keyof typeof translations['EN']) => string;
    isChatOpen: boolean;
    setIsChatOpen: (isOpen: boolean) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
    const [lang, setLang] = useState<Language>('ID');
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Initialize from LocalStorage or Data
    useEffect(() => {
        const savedUser = localStorage.getItem('demo_user');
        const savedTimeline = localStorage.getItem('demo_timeline');

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        if (savedTimeline) {
            setTimeline(JSON.parse(savedTimeline));
        }
        const savedLang = localStorage.getItem('demo_lang') as Language;
        if (savedLang) {
            setLang(savedLang);
        }
    }, []);

    // Sync with LocalStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem('demo_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('demo_user');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('demo_timeline', JSON.stringify(timeline));
    }, [timeline]);

    useEffect(() => {
        localStorage.setItem('demo_lang', lang);
    }, [lang]);

    const t = (key: keyof typeof translations['EN']) => {
        return translations[lang][key] || key;
    };

    const login = () => {
        setUser(INITIAL_USER);
        setTimeline(INITIAL_TIMELINE);
    };

    const logout = () => {
        setUser(null);
        setTimeline([]);
        localStorage.clear();
    };

    const addTimelineEvent = (type: TimelineEvent['type'], productId: string) => {
        const product = PRODUCTS.find((p) => p.id === productId);
        if (!product) return;

        const newEvent: TimelineEvent = {
            id: `evt-${Date.now()}`,
            date: new Date().toISOString(),
            type,
            productId,
            productName: product.name,
        };
        setTimeline((prev) => [newEvent, ...prev]);
    };

    const trackView = (productId: string) => {
        if (!user) return;
        setUser((prev) => {
            if (!prev) return null;
            const alreadyViewed = prev.viewedProducts.includes(productId);
            return {
                ...prev,
                viewedProducts: alreadyViewed
                    ? [productId, ...prev.viewedProducts.filter(id => id !== productId)]
                    : [productId, ...prev.viewedProducts]
            };
        });
        addTimelineEvent('viewed', productId);
    };

    const addToCart = (productId: string, quantity: number) => {
        if (!user) {
            alert('Please login as a demo user first.');
            return;
        }
        setUser((prev) => {
            if (!prev) return null;
            const existing = prev.cartItems.find((item) => item.productId === productId);
            const updatedCart = existing
                ? prev.cartItems.map((item) =>
                    item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
                )
                : [...prev.cartItems, { productId, quantity }];

            return { ...prev, cartItems: updatedCart };
        });
        addTimelineEvent('cart', productId);
    };

    const removeFromCart = (productId: string) => {
        if (!user) return;
        setUser((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                cartItems: prev.cartItems.filter((item) => item.productId !== productId),
            };
        });
    };

    const reserveProduct = (productId: string, storeId: string, storeName: string) => {
        if (!user) {
            alert('Please login as a demo user first.');
            return;
        }
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        setUser((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                reservations: [
                    ...prev.reservations,
                    { productId, storeId, date: new Date().toISOString() },
                ],
            };
        });
        addTimelineEvent('reserved', productId);
    };

    const checkout = () => {
        if (!user || user.cartItems.length === 0) return;

        const newOrder = {
            id: `ord-${Math.floor(Math.random() * 1000)}`,
            date: new Date().toISOString(),
            status: 'Processing' as const,
            items: user.cartItems.map((item) => {
                const p = PRODUCTS.find((prod) => prod.id === item.productId);
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: p?.price || 0,
                };
            }),
        };

        setUser((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                cartItems: [],
                orders: [newOrder, ...prev.orders],
            };
        });

        user.cartItems.forEach(item => addTimelineEvent('purchased', item.productId));
    };

    return (
        <DemoContext.Provider
            value={{
                user,
                timeline,
                login,
                logout,
                addToCart,
                removeFromCart,
                reserveProduct,
                checkout,
                trackView,
                lang,
                setLang,
                t,
                isChatOpen,
                setIsChatOpen,
            }}
        >
            {children}
        </DemoContext.Provider>
    );
};

export const useDemo = () => {
    const context = useContext(DemoContext);
    if (context === undefined) {
        throw new Error('useDemo must be used within a DemoProvider');
    }
    return context;
};
