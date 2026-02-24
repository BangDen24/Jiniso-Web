'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { USERS, PRODUCTS, STORES, Order } from '@/lib/data';
import { useRouter } from 'next/navigation';
import {
    ShoppingBag,
    Activity,
    TrendingUp,
    Calendar,
    ShieldCheck,
    Search,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    LayoutDashboard,
    Store,
    Layers,
    Eye,
    Edit2,
    Trash2,
    ArrowRightLeft,
    Package,
    History,
    UserPlus
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const AdminDashboard = () => {
    const { user, t } = useApp();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'inventory' | 'transactions'>('overview');
    const [userSearch, setUserSearch] = useState('');
    const [chartPeriod, setChartPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

    // Generate many dummy users for simulation
    const allUsers = useMemo(() => {
        const baseUsers = [...USERS];
        const extraUsers = [];
        const names = ['Ahmad', 'Budi', 'Citra', 'Dewi', 'Eko', 'Fani', 'Gani', 'Hana', 'Indra', 'Joni', 'Kiki', 'Lulu', 'Maya', 'Nico', 'Oki', 'Putri', 'Rian', 'Sari', 'Tono', 'Uli'];
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotstyle.id'];

        for (let i = 0; i < 48; i++) {
            const firstName = names[Math.floor(Math.random() * names.length)];
            const lastName = names[Math.floor(Math.random() * names.length)];
            const name = `${firstName} ${lastName}`;
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@${domains[Math.floor(Math.random() * domains.length)]}`;
            const regDate = new Date(Date.now() - Math.random() * 10000000000).toISOString();

            extraUsers.push({
                ...baseUsers[baseUsers.length - 1],
                id: `user-extra-${i}`,
                name,
                email,
                role: 'user',
                registeredAt: regDate,
                loginLogs: [
                    {
                        date: new Date(Date.now() - Math.random() * 500000000).toISOString(),
                        device: Math.random() > 0.5 ? 'Windows / Chrome' : 'iPhone / Safari',
                        ip: `192.168.1.${Math.floor(Math.random() * 255)}`
                    }
                ]
            });
        }
        return [...baseUsers, ...extraUsers];
    }, []);

    const allOrders = useMemo(() => {
        const orders: (Order & { userName: string, userId: string })[] = [];
        allUsers.forEach(u => {
            u.orders?.forEach(o => {
                orders.push({ ...o, userName: u.name, userId: u.id });
            });
        });

        const displayOrdersCount = orders.length > 0 ? orders.length * 124 : 1240;

        return {
            data: orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
            displayCount: displayOrdersCount
        };
    }, [allUsers]);

    const totalRevenue = useMemo(() => {
        const baseRev = allOrders.data.reduce((acc, order) => {
            return acc + order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }, 0);
        return (baseRev > 0 ? baseRev : 15000000) * 85;
    }, [allOrders]);

    const branchStats = useMemo(() => {
        return STORES.map(store => {
            const stock = PRODUCTS.reduce((acc, p) => {
                const s = p.stockPerStore.find(st => st.storeId === store.id);
                return acc + (s?.stock || 0);
            }, 0);

            const salesWeight = Math.random() * 0.5 + 0.25;
            const sales = Math.floor(totalRevenue * salesWeight / STORES.length);
            const orderCount = Math.floor(allOrders.displayCount * salesWeight / STORES.length);

            return { ...store, stock, sales, orderCount };
        });
    }, [totalRevenue, allOrders]);

    const inventoryDistribution = useMemo(() => {
        return branchStats.map(s => ({
            name: s.name,
            value: s.stock
        }));
    }, [branchStats]);

    const COLORS = ['#18181B', '#3F3F46', '#71717A', '#A1A1AA', '#D4D4D8'];

    const salesCharts = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthly = months.map((m, idx) => {
            const seasonalFactor = idx > 9 ? 1.8 : (idx < 2 ? 1.4 : 1);
            const stockIn = Math.floor((4000 + Math.random() * 10000) * seasonalFactor);
            const stockOut = Math.floor(stockIn * (0.55 + Math.random() * 0.4));
            return { label: m, in: stockIn, out: stockOut };
        });

        const quarters = ['2025-Q1', '2025-Q2', '2025-Q3', '2025-Q4'];
        const quarterly = quarters.map(q => {
            const stockIn = Math.floor(35000 + Math.random() * 45000);
            const stockOut = Math.floor(stockIn * (0.65 + Math.random() * 0.3));
            return { label: q, in: stockIn, out: stockOut };
        });

        const years = ['2023', '2024', '2025', '2026'];
        const yearly = years.map(y => {
            const stockIn = Math.floor(180000 + Math.random() * 250000);
            const stockOut = Math.floor(stockIn * (0.75 + Math.random() * 0.2));
            return { label: y, in: stockIn, out: stockOut };
        });

        return { monthly, quarterly, yearly };
    }, []);

    const activeChartData = salesCharts[chartPeriod];

    const filteredUsers = useMemo(() => {
        return allUsers.filter(u =>
            u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
            u.email.toLowerCase().includes(userSearch.toLowerCase())
        );
    }, [allUsers, userSearch]);

    const recentLogs = useMemo(() => {
        const loginLogs: { userName: string, date: string, type: 'login' | 'registration' }[] = [];
        const regLogs: { userName: string, date: string, type: 'login' | 'registration' }[] = [];

        allUsers.forEach(u => {
            u.loginLogs?.forEach(log => {
                loginLogs.push({ ...log, userName: u.name, type: 'login' });
            });
            regLogs.push({ date: u.registeredAt, userName: u.name, type: 'registration' });
        });

        return {
            login: loginLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
            registration: regLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        };
    }, [allUsers]);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            const timer = setTimeout(() => {
                router.push('/');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [user, router]);

    if (!user || user.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 space-y-6 text-center">
                <ShieldCheck size={64} className="text-zinc-300" />
                <h1 className="text-2xl font-bold uppercase tracking-tight text-zinc-900">Access Denied</h1>
                <p className="text-sm text-muted">Redirecting...</p>
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900 p-3 shadow-xl rounded-lg border border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">{label}</p>
                    <div className="space-y-1">
                        {payload.map((p: any) => (
                            <div key={p.name} className="flex justify-between items-center gap-4">
                                <span className="text-[9px] font-bold text-zinc-500 uppercase">{p.name}</span>
                                <span className={`text-xs font-bold ${p.name === 'Stock In' ? 'text-green-400' : 'text-red-400'}`}>
                                    {p.value.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return null;
    };

    const LoginLogWidget = ({ limit = 10 }: { limit?: number }) => {
        const [logType, setLogType] = useState<'login' | 'registration'>('login');
        const displayedLogs = recentLogs[logType].slice(0, limit);

        return (
            <div className="bg-white border border-zinc-100 p-6 rounded-2xl shadow-sm space-y-5 flex flex-col h-full">
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-50 pb-3">
                        <div className="flex items-center space-x-2">
                            <History size={16} className="text-accent" />
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900">History Log</h3>
                        </div>
                    </div>
                    {/* Log Toggle Switcher */}
                    <div className="flex bg-zinc-50 p-1 rounded-lg border border-zinc-100">
                        <button
                            onClick={() => setLogType('login')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-1.5 text-[9px] font-bold uppercase tracking-tight rounded-md transition-all ${logType === 'login' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400'}`}
                        >
                            <Activity size={12} />
                            <span>Login</span>
                        </button>
                        <button
                            onClick={() => setLogType('registration')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-1.5 text-[9px] font-bold uppercase tracking-tight rounded-md transition-all ${logType === 'registration' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400'}`}
                        >
                            <UserPlus size={12} />
                            <span>Registrasi</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-4 flex-1">
                    {displayedLogs.map((log, i) => (
                        <div key={i} className="group">
                            <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                                <span className={`${log.type === 'login' ? 'text-green-600' : 'text-blue-600'} uppercase tracking-tighter`}>
                                    {log.type === 'login' ? 'Logged In' : 'Joined'} {new Date(log.date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit' })} at {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${log.type === 'login' ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></div>
                                <span className="text-xs font-black text-zinc-900 uppercase truncate">{log.userName}</span>
                            </div>
                            {i < displayedLogs.length - 1 && <div className="border-b border-zinc-50 pt-3 mb-0"></div>}
                        </div>
                    ))}
                    {displayedLogs.length === 0 && (
                        <p className="text-[10px] text-zinc-400 font-bold uppercase text-center py-4 italic">No recent activity</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-b border-zinc-100 pb-10">
                <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-accent">
                        <LayoutDashboard size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{t('adminDashboard')}</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase italic text-zinc-900">
                        Admin <span className="text-accent underline decoration-accent/10">Portal</span>
                    </h1>
                </div>

                <div className="flex flex-wrap bg-zinc-100 p-1 rounded-xl border border-zinc-200 w-fit">
                    {(['overview', 'users', 'inventory', 'transactions'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all rounded-lg ${activeTab === tab
                                    ? 'bg-white text-zinc-900 shadow-sm'
                                    : 'text-zinc-400 hover:text-zinc-600'
                                }`}
                        >
                            {t(tab as any) || tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="space-y-10">
                    {/* Stats Grid - Simplified Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title="Revenue"
                            value={`Rp ${totalRevenue.toLocaleString()}`}
                            trend="+24%"
                            icon={<TrendingUp size={20} />}
                            isPositive={true}
                        />
                        <StatCard
                            title="Orders"
                            value={allOrders.displayCount.toLocaleString()}
                            trend="+42%"
                            icon={<ShoppingBag size={20} />}
                            isPositive={true}
                        />
                        <StatCard
                            title="Users"
                            value={(allUsers.length * 842).toLocaleString()}
                            trend="+12%"
                            icon={<Activity size={20} />}
                            isPositive={true}
                        />
                        <StatCard
                            title="Fulfillment"
                            value="98.2%"
                            trend="-0.4%"
                            icon={<Layers size={20} />}
                            isPositive={false}
                        />
                    </div>

                    {/* Main Analytics Visuals */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 content-start">
                        {/* Shorter Stock Flow Chart */}
                        <div className="lg:col-span-3 bg-white border border-zinc-100 p-6 sm:p-8 shadow-sm space-y-6 rounded-2xl flex flex-col h-fit">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold uppercase tracking-tight text-zinc-900">Stock Flow</h2>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Items In vs Items Out</p>
                                </div>
                                <div className="flex bg-zinc-50 p-1 rounded-lg border border-zinc-200 gap-1">
                                    {(['monthly', 'quarterly', 'yearly'] as const).map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setChartPeriod(p)}
                                            className={`px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded-md ${chartPeriod === p ? 'bg-zinc-900 text-white' : 'text-zinc-400'}`}
                                        >
                                            {t((p + 'Sales') as any)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-[320px] mt-2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={activeChartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#71717A' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#A1A1AA' }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8f8f8' }} />
                                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', paddingBottom: '15px' }} />
                                        <Bar dataKey="in" name="Stock In" fill="#22c55e" radius={[2, 2, 0, 0]} barSize={12} />
                                        <Bar dataKey="out" name="Stock Out" fill="#ef4444" radius={[2, 2, 0, 0]} barSize={12} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="lg:col-span-1 space-y-6 h-fit">
                            <LoginLogWidget limit={4} />
                            <div className="bg-zinc-900 text-white p-6 shadow-xl space-y-6 flex flex-col rounded-2xl">
                                <h2 className="text-lg font-bold uppercase tracking-tight border-b border-white/10 pb-3">{t('topSellingItems')}</h2>
                                <div className="space-y-4 flex-1">
                                    {PRODUCTS.slice(0, 3).map((p, i) => (
                                        <div key={p.id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-xs font-bold text-accent/50">0{i + 1}</span>
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-tight line-clamp-1">{p.name}</p>
                                                    <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">{p.soldCount * 42} SALES</p>
                                                </div>
                                            </div>
                                            <p className="text-[10px] font-bold italic text-white">Rp {(p.price / 1000).toFixed(0)}K</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-zinc-50 p-8 rounded-2xl border border-zinc-200 shadow-sm">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold uppercase tracking-tight text-zinc-900">{t('userManagement')}</h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Manage Access Levels</p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                                className="w-full bg-white border border-zinc-200 py-3 pl-10 pr-4 text-xs font-bold rounded-xl focus:outline-none focus:ring-2 ring-accent/5 transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* User Table (Left 3/4) */}
                        <div className="lg:col-span-3 bg-white border border-zinc-100 shadow-sm overflow-hidden overflow-x-auto rounded-2xl">
                            <table className="w-full text-left min-w-[600px]">
                                <thead className="bg-zinc-900 text-white uppercase text-xs font-bold tracking-widest">
                                    <tr>
                                        <th className="px-6 py-6 italic">Role</th>
                                        <th className="px-6 py-6 italic">Identity</th>
                                        <th className="px-6 py-6 text-center italic">Joined</th>
                                        <th className="px-6 py-6 italic">Last Seen</th>
                                        <th className="px-6 py-6 text-right italic">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    {filteredUsers.slice(0, 12).map((u) => (
                                        <tr key={u.id} className="hover:bg-zinc-50/50 transition-colors">
                                            <td className="px-6 py-5">
                                                <span className={`text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-lg border ${u.role === 'admin' ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-500 border-zinc-200'
                                                    }`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center font-black text-zinc-400 border border-zinc-200 text-xs shadow-inner">
                                                        {u.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black uppercase tracking-tight text-zinc-900 line-clamp-1 italic">{u.name}</p>
                                                        <p className="text-[11px] font-bold text-muted line-clamp-1">{u.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center text-xs font-black text-zinc-600 uppercase">
                                                {new Date(u.registeredAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="text-xs font-black text-zinc-900 uppercase italic">{u.loginLogs[0] ? new Date(u.loginLogs[0].date).toLocaleDateString() : 'N/A'}</p>
                                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">{u.loginLogs[0]?.device?.split('/')[0] || 'N/A'}</p>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button className="p-2 border border-zinc-100 rounded-xl hover:bg-zinc-900 hover:text-white transition-all shadow-sm"><Eye size={14} /></button>
                                                    <button className="p-2 border border-zinc-100 rounded-xl hover:bg-zinc-900 hover:text-white transition-all shadow-sm"><Edit2 size={14} /></button>
                                                    <button className="p-2 border border-zinc-100 rounded-xl hover:bg-red-500 hover:text-white transition-all opacity-30 hover:opacity-100 shadow-sm"><Trash2 size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredUsers.length > 12 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center text-[10px] font-black text-zinc-400 bg-zinc-50/20 uppercase tracking-[0.2em] italic">
                                                Syncing {filteredUsers.length - 12} other database entries
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Login Log Section (Right 1/4) */}
                        <div className="lg:col-span-1">
                            <LoginLogWidget limit={10} />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'inventory' && (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 bg-white text-zinc-900 p-8 rounded-2xl flex flex-col space-y-8 shadow-sm border border-zinc-100">
                            <h3 className="text-lg font-bold uppercase tracking-tight text-accent border-l-2 border-accent pl-4">Global Stock</h3>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Live Count</p>
                                    <p className="text-4xl font-black italic">{(PRODUCTS.reduce((acc, p) => acc + p.stockPerStore.reduce((s, st) => s + st.stock, 0), 0) * 1.5).toFixed(0).toLocaleString()}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-zinc-50">
                                    <div>
                                        <p className="text-[9px] font-bold text-zinc-500 uppercase">Alerts</p>
                                        <p className="text-xl font-bold text-red-500">42</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-zinc-500 uppercase">SKUs</p>
                                        <p className="text-xl font-bold text-zinc-900">1,240</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 bg-white border border-zinc-100 p-8 shadow-sm rounded-2xl flex flex-col min-h-[350px]">
                            <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-900 mb-6">Branch Allocation</h3>
                            <div className="flex-1">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={inventoryDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                                            {inventoryDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#18181B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                        <Legend wrapperStyle={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', paddingTop: '10px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {branchStats.map(store => (
                            <div key={store.id} className="bg-white border border-zinc-100 p-8 shadow-sm rounded-2xl space-y-8">
                                <div className="flex justify-between items-start border-b border-zinc-50 pb-6">
                                    <div>
                                        <h4 className="text-xl font-bold uppercase tracking-tight text-zinc-900">{store.name}</h4>
                                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{store.location}</p>
                                    </div>
                                    <div className="bg-white text-zinc-900 p-3 border border-zinc-100 rounded-xl">
                                        <Store size={20} />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-baseline">
                                        <p className="text-3xl font-black italic text-zinc-900">{(store.stock * 12).toLocaleString()}</p>
                                        <span className="text-[10px] font-bold text-muted uppercase italic">Units</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-bold uppercase">
                                            <span className="text-muted">Capacity</span>
                                            <span>{Math.floor(60 + Math.random() * 30)}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-zinc-50 rounded-full border border-zinc-100">
                                            <div className="h-full bg-zinc-900 rounded-full" style={{ width: `${Math.floor(60 + Math.random() * 30)}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'transactions' && (
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-100 pb-10">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold uppercase tracking-tight text-zinc-900">{t('transactionHistory')}</h2>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Recent Financial Registry</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {allOrders.data.slice(0, 10).map((order) => {
                            const itemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);
                            const totalAmount = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                            return (
                                <div key={order.id} className="bg-white border border-zinc-100 p-8 flex flex-col xl:flex-row justify-between xl:items-center gap-8 rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-zinc-50 flex items-center justify-center border border-zinc-100 rounded-xl text-zinc-300">
                                            <ShoppingBag size={24} />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[9px] font-bold uppercase bg-zinc-100 text-zinc-500 px-3 py-1 rounded-md">{order.id}</span>
                                                <span className="text-[9px] font-bold uppercase text-muted">{new Date(order.date).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="text-xl font-bold uppercase tracking-tight text-zinc-900">{order.userName}</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8 text-right">
                                        <div>
                                            <p className="text-[9px] font-bold text-muted uppercase">Qty</p>
                                            <p className="text-xl font-black italic text-zinc-900">{(itemsCount * 3)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-accent uppercase">Value</p>
                                            <p className="text-2xl font-black italic text-zinc-900">Rp {(totalAmount * 45).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ title, value, trend, icon, isPositive }: { title: string, value: string, trend: string, icon: React.ReactNode, isPositive: boolean }) => (
    <div className="bg-white border border-zinc-100 p-6 shadow-sm space-y-8 rounded-2xl">
        <div className="flex justify-between items-start">
            <div className="p-3 bg-white border border-zinc-100 text-accent rounded-xl">
                {icon}
            </div>
            <div className={`text-[10px] font-bold px-3 py-1 rounded-full border border-zinc-50 ${isPositive ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'}`}>
                {trend}
            </div>
        </div>
        <div className="space-y-1">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{title}</h3>
            <p className="text-2xl font-black italic text-zinc-900 truncate">{value}</p>
        </div>
    </div>
);

export default AdminDashboard;
