'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Sparkles } from 'lucide-react';
import { useDemo } from '@/context/DemoContext';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const Chatbot = () => {
    const { t } = useDemo();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    id: '1',
                    text: t('chatbotWelcome'),
                    sender: 'bot',
                    timestamp: new Date(),
                },
            ]);
        }
    }, [isOpen, t]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        simulateResponse(text);
    };

    const simulateResponse = (userText: string) => {
        setIsTyping(true);

        // Dynamic response logic based on keywords or quick replies
        let responseKey = 'chatResponseHuman'; // Default
        const lowerText = userText.toLowerCase();

        if (lowerText.includes('track') || lowerText.includes('lacak') || lowerText.includes('追跡')) {
            responseKey = 'chatResponseTrack';
        } else if (lowerText.includes('size') || lowerText.includes('ukuran') || lowerText.includes('サイズ')) {
            responseKey = 'chatResponseSizing';
        } else if (lowerText.includes('store') || lowerText.includes('toko') || lowerText.includes('店舗')) {
            responseKey = 'chatResponseStore';
        }

        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: t(responseKey as any),
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const quickActions = [
        { label: t('chatTrackOrder'), value: t('chatTrackOrder') },
        { label: t('chatSizingHelp'), value: t('chatSizingHelp') },
        { label: t('chatStoreInfo'), value: t('chatStoreInfo') },
        { label: t('chatHuman'), value: t('chatHuman') },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {/* FAB */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${isOpen ? 'bg-zinc-900 text-white rotate-90' : 'bg-accent text-white'
                    }`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-white"></span>
                    </span>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-3xl border border-zinc-100 flex flex-col overflow-hidden animate-fade-in-up origin-bottom-right">
                    {/* Header */}
                    <div className="p-6 bg-zinc-900 text-white flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
                                <Bot size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm tracking-tight uppercase italic">JINISO Concierge</h3>
                                <div className="flex items-center space-x-1.5 pt-0.5">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Active Support</span>
                                </div>
                            </div>
                        </div>
                        <Sparkles size={18} className="text-accent opacity-50" />
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/50"
                    >
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                            >
                                <div className={`flex items-end space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-zinc-200' : 'bg-accent'
                                        }`}>
                                        {msg.sender === 'user' ? <User size={12} className="text-zinc-600" /> : <Bot size={12} className="text-white" />}
                                    </div>
                                    <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-zinc-900 text-white rounded-tr-none'
                                            : 'bg-white border border-zinc-100 text-zinc-800 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                        <Bot size={12} className="text-white" />
                                    </div>
                                    <div className="bg-white border border-zinc-100 p-4 rounded-2xl rounded-tl-none flex space-x-1">
                                        <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="px-6 py-4 border-t border-zinc-100 flex overflow-x-auto gap-2 no-scrollbar bg-white">
                        {quickActions.map((action, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(action.value)}
                                className="flex-shrink-0 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-accent hover:text-accent transition-all duration-300"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white border-t border-zinc-100">
                        <div className="relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                                placeholder={t('chatPlaceholder')}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-full pl-6 pr-14 py-4 text-xs font-medium focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                            />
                            <button
                                onClick={() => handleSend(inputValue)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center hover:bg-black transition-all"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
