'use client';

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { HelpCircle, ChevronDown, Package, RefreshCw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white hover:border-accent/30 transition-colors">
            <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={onClick}
            >
                <span className="font-bold text-sm tracking-wide text-zinc-900 pr-8">{question}</span>
                <ChevronDown
                    size={20}
                    className={`text-accent transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`transition-all duration-300 ease-in-out bg-zinc-50 ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
            >
                <p className="px-6 py-5 text-sm font-medium text-muted leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default function HelpPage() {
    const { t } = useDemo();
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqSections = [
        {
            title: t('faqShipping'),
            icon: <Package size={20} className="text-accent" />,
            items: [
                { q: t('faqShippingQ1'), a: t('faqShippingA1') },
                { q: 'Do you offer international shipping?', a: 'Currently, this demo focuses on domestic shipping within Indonesia. Stay tuned for global expansion updates.' },
                { q: 'How can I change my delivery address?', a: 'You can update your primary residence in your Account settings. For active orders, please contact concierge support immediately.' }
            ]
        },
        {
            title: t('faqReturns'),
            icon: <RefreshCw size={20} className="text-accent" />,
            items: [
                { q: t('faqReturnsQ1'), a: t('faqReturnsA1') },
                { q: 'How do I start an exchange process?', a: 'Navigate to your Order History, select the item, and choose "Request Exchange". A shipping label will be provided.' },
                { q: 'Are sale items eligible for return?', a: 'Items purchased during special promotional periods are final sale unless deemed faulty upon arrival.' }
            ]
        },
        {
            title: t('faqProduct'),
            icon: <Sparkles size={20} className="text-accent" />,
            items: [
                { q: t('faqProductQ1'), a: t('faqProductA1') },
                { q: 'What is the sizing like?', a: 'Most of our garments feature a relaxed, oversized fit typical of streetwear. Consult the size guide on each product page.' },
                { q: 'How often do you restock items?', a: 'Core essentials are restocked monthly. Seasonal pieces are limited edition and typically not restocked once sold out.' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 pb-24">
            {/* Header */}
            <div className="bg-zinc-900 text-white pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent via-zinc-900 to-zinc-900" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-4 mx-auto animate-pulse">
                        <HelpCircle size={32} />
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase italic">
                        {t('helpCenter')}
                    </h1>
                    <p className="max-w-xl mx-auto text-zinc-400 font-medium tracking-wide">
                        {t('helpCenterDesc')}
                    </p>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-muted">
                    <Link href="/" className="hover:text-accent transition-colors">{t('home')}</Link>
                    <ChevronRight size={12} />
                    <span className="text-zinc-900">{t('helpCenter')}</span>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Sidebar / Quick Links */}
                    <div className="w-full md:w-1/3 space-y-8 animate-fade-in-up">
                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200 shadow-sm sticky top-24">
                            <h3 className="text-lg font-bold uppercase tracking-tight italic mb-6 border-b border-zinc-100 pb-4">Categories</h3>
                            <div className="space-y-4">
                                {faqSections.map((section, idx) => (
                                    <div key={idx} className="flex items-center space-x-3 text-sm font-bold text-muted hover:text-accent transition-colors cursor-pointer group">
                                        <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                                            {section.icon}
                                        </div>
                                        <span>{section.title}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 pt-6 border-t border-zinc-100 space-y-4">
                                <p className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Still need help?</p>
                                <button className="w-full py-3 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-accent transition-all">
                                    {t('chatHuman')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Accordions */}
                    <div className="w-full md:w-2/3 space-y-12">
                        {faqSections.map((section, sectionIdx) => (
                            <div
                                key={sectionIdx}
                                className="space-y-6 animate-fade-in-up"
                                style={{ animationDelay: `${sectionIdx * 100}ms` }}
                            >
                                <div className="flex items-center space-x-3 pb-2 border-b-2 border-zinc-900 inline-flex">
                                    {section.icon}
                                    <h2 className="text-xl font-bold uppercase tracking-tight italic">{section.title}</h2>
                                </div>
                                <div className="space-y-3">
                                    {section.items.map((item, itemIdx) => {
                                        // Calculate a unique flat index for open state management
                                        const flatIndex = sectionIdx * 10 + itemIdx;
                                        return (
                                            <FAQItem
                                                key={itemIdx}
                                                question={item.q}
                                                answer={item.a}
                                                isOpen={openIndex === flatIndex}
                                                onClick={() => toggleAccordion(flatIndex)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
