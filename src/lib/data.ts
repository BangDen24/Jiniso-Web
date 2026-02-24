export interface Product {
    id: string;
    name: string;
    price: number;
    image: string; // Keep for backward compatibility/thumbnail
    images: string[];
    description: string;
    category: 'Men' | 'Women' | 'Kids' | 'Accessories' | 'Collections';
    subCategory: 'Tops' | 'Bottoms' | 'Outerwear' | 'Innerwear' | 'Accessories';
    isFeatured?: boolean;
    stockPerStore: {
        storeId: string;
        stock: number;
    }[];
    soldCount: number;
}

export interface Store {
    id: string;
    name: string;
    location: string;
    mapUrl?: string;
}

export interface Testimonial {
    id: string;
    user: string;
    content: string;
    rating: number;
    date?: string;
}

export interface TrackingStep {
    status: string;
    date: string;
    location?: string;
    description: string;
}

export interface Order {
    id: string;
    date: string;
    items: {
        productId: string;
        quantity: number;
        price: number;
        tracking?: TrackingStep[];
        courierName?: string;
        estimatedArrival?: string;
        shippedDate?: string;
    }[];
    status: 'Delivered' | 'Processing' | 'Shipped';
    paymentTimeline?: TrackingStep[];
    paymentMethod?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    viewedProducts: string[];
    cartItems: { productId: string; quantity: number }[];
    reservations: { productId: string; storeId: string; date: string }[];
    orders: Order[];
    visitHistory: { date: string; action: string }[];
    role: 'admin' | 'user';
    registeredAt: string;
    loginLogs: { date: string; ip?: string; device?: string }[];
}

export interface TimelineEvent {
    id: string;
    date: string;
    type: 'viewed' | 'cart' | 'reserved' | 'purchased';
    productId: string;
    productName: string;
}

export const STORES: Store[] = [
    {
        id: 's1',
        name: 'Summarecon Mall Bekasi',
        location: 'Level 1, Fashion District',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.052733857599!2d106.99757657590246!3d-6.223835660995254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c257850029b%3A0xc4eb7ed0f44358fb!2sSummarecon%20Mall%20Bekasi!5e0!3m2!1sen!2sid!4v1709123456789!5m2!1sen!2sid'
    },
    {
        id: 's2',
        name: 'Summarecon Mall Bandung',
        location: 'Ground Floor, Unit 12',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1468.216396781223!2d107.69742048559091!3d-6.945371661384013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c3bedea322a3%3A0x6fb87aeab83a4c49!2sSummarecon%20Mall%20Bandung!5e0!3m2!1sen!2sid!4v1709123456789!5m2!1sen!2sid'
    },
    {
        id: 's3',
        name: 'Pondok Indah Mall 3',
        location: 'Level 2, North Wing',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9189601447545!2d106.7801331759026!3d-6.274358661413669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1681a8cfc55%3A0x1382fbaf2b28c50c!2sPondok%20Indah%20Mall%203!5e0!3m2!1sen!2sid!4v1709123456789!5m2!1sen!2sid'
    },
];

export const TESTIMONIALS: Testimonial[] = [
    { id: 't1', user: 'Sarah K.', content: 'The oversized tees are literally perfect. Cotton is so thick!', rating: 5, date: '2026-02-10' },
    { id: 't2', user: 'Michael B.', content: 'Best jeans I have owned in years. The fit is exactly as described.', rating: 5, date: '2026-02-12' },
    { id: 't3', user: 'Lia W.', content: 'Fast delivery and the packaging was so premium. Love the brand vibe.', rating: 4, date: '2026-02-14' },
    { id: 't4', user: 'David R.', content: 'Minimalist design but high impact. Highly recommend for daily wear.', rating: 5, date: '2026-02-15' },
    { id: 't5', user: 'Elena P.', content: 'Great value for money. The fabric feels really high-end.', rating: 5, date: '2026-02-18' },
];

const categoryPrefixes = ['Essential', 'Urban', 'Classic', 'Premium', 'Street', 'Modern', 'Vintage', 'Minimal', 'Active', 'Daily'];
const productTypes = [
    {
        type: 'Oversized Tee', price: 199000,
        imgs: [
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Women' as const, sub: 'Tops' as const
    },
    {
        type: 'Slim Fit Jeans', price: 499000,
        imgs: [
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Men' as const, sub: 'Bottoms' as const
    },
    {
        type: 'Canvas Tote', price: 89000,
        imgs: [
            'https://images.unsplash.com/photo-1544816153-09730556637e?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1610494050212-9f37c76891ee?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Accessories' as const, sub: 'Accessories' as const
    },
    {
        type: 'Tech Hoodie', price: 359000,
        imgs: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Collections' as const, sub: 'Outerwear' as const
    },
    {
        type: 'Cargo Pants', price: 429000,
        imgs: [
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1604176354204-926873ff3da9?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1624371414361-e6e8ea403522?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Men' as const, sub: 'Bottoms' as const
    },
    {
        type: 'Denim Jacket', price: 599000,
        imgs: [
            'https://images.unsplash.com/photo-1576905341935-422730623643?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Women' as const, sub: 'Outerwear' as const
    },
    {
        type: 'Beanie Hat', price: 129000,
        imgs: [
            'https://images.unsplash.com/photo-1576871337622-98d48d365da2?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Accessories' as const, sub: 'Accessories' as const
    },
    {
        type: 'Cotton Socks', price: 49000,
        imgs: [
            'https://images.unsplash.com/photo-1582966298438-641ff1ec8d7d?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1586351112444-24e525a1338d?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Accessories' as const, sub: 'Accessories' as const
    },
    {
        type: 'Windbreaker', price: 459000,
        imgs: [
            'https://images.unsplash.com/photo-1620331311520-246422ff83f9?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1524338198850-e75865442a44?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Collections' as const, sub: 'Outerwear' as const
    },
    {
        type: 'Linen Shirt', price: 289000,
        imgs: [
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1598033129183-c4f50c717658?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Men' as const, sub: 'Tops' as const
    },
    {
        type: 'Polo Shirt', price: 249000,
        imgs: [
            'https://images.unsplash.com/photo-1586363104864-50e2246b621e?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1532332248682-206cc786359f?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Men' as const, sub: 'Tops' as const
    },
    {
        type: 'Chino Pants', price: 399000,
        imgs: [
            'https://images.unsplash.com/photo-1473966968600-fa804b869628?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1565084888279-aff996979482?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1560233026-ad254fa8da38?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Men' as const, sub: 'Bottoms' as const
    },
    {
        type: 'Sweatshirt', price: 299000,
        imgs: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Women' as const, sub: 'Tops' as const
    },
    {
        type: 'Skater Skirt', price: 189000,
        imgs: [
            'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1591360236630-4ec927b87820?w=800&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?w=800&auto=format&fit=crop&q=60'
        ],
        cat: 'Women' as const, sub: 'Bottoms' as const
    },
];

const generateProducts = (count: number): Product[] => {
    const items: Product[] = [];
    for (let i = 1; i <= count; i++) {
        const typeIdx = i % productTypes.length;
        const prefixIdx = Math.floor(i / productTypes.length) % categoryPrefixes.length;
        const baseProduct = productTypes[typeIdx];
        const prefix = categoryPrefixes[prefixIdx];

        items.push({
            id: `p-${i}`,
            name: `${prefix} ${baseProduct.type} ${i}`,
            price: baseProduct.price + (((i * 7) % 20) * 1000),
            image: baseProduct.imgs[0],
            images: baseProduct.imgs,
            category: baseProduct.cat,
            subCategory: baseProduct.sub,
            isFeatured: i <= 8,
            description: `Description for ${prefix} ${baseProduct.type}. This is a high-quality product part of our seasonal collection. Designed for versatility and long-lasting wear.`,
            stockPerStore: [
                { storeId: 's1', stock: ((i * 3) % 25) },
                { storeId: 's2', stock: ((i * 5) % 25) },
                { storeId: 's3', stock: ((i * 11) % 25) },
            ],
            soldCount: Math.floor(Math.random() * 500) + 50,
        });
    }
    return items;
};

export const PRODUCTS: Product[] = generateProducts(150);

const generateLogistics = (status: 'Processing' | 'Shipped' | 'Delivered', orderDateStr: string) => {
    const expeditions = ['JNE Regular', 'J&T Express', 'SiCepat BEST', 'Anteraja Regular', 'Shopee Xpress'];
    const expedition = expeditions[Math.floor(Math.random() * expeditions.length)];
    const orderDate = new Date(orderDateStr);

    const addDays = (d: Date, days: number) => {
        const date = new Date(d);
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    };

    const shippedOn = addDays(orderDate, 1);
    const inTransitDate = addDays(orderDate, 2);
    const outForDeliveryDate = addDays(orderDate, 3);
    const estimatedArrival = addDays(orderDate, 3);

    const steps: TrackingStep[] = [
        { status: 'Order Created', date: orderDateStr.split('T')[0], location: 'System', description: 'Order has been successfully created and confirmed.' },
    ];

    if (status === 'Processing' || status === 'Shipped' || status === 'Delivered') {
        steps.push({ status: 'Processing', date: addDays(orderDate, 0.5), location: 'Tangerang Distribution Center', description: 'Your items are being picked and packed by our warehouse team.' });
        steps.push({ status: 'Ready for Shipment', date: addDays(orderDate, 1), location: 'Tangerang Distribution Center', description: 'Package is ready and waiting for courier pickup.' });
    }

    if (status === 'Shipped' || status === 'Delivered') {
        steps.push({ status: 'Handed to Courier', date: shippedOn, location: 'Bekasi Hub', description: `Package picked up by ${expedition} and in process for sorting.` });
        steps.push({ status: 'Departed from Hub', date: addDays(orderDate, 1.5), location: 'Bekasi Hub', description: 'Package has departed from the initial sorting hub.' });
        steps.push({ status: 'Arrived at Destination Hub', date: inTransitDate, location: 'Jakarta South Gateway', description: 'Package has arrived at the destination sorting facility.' });
        steps.push({ status: 'Processed at Facility', date: addDays(orderDate, 2.5), location: 'Jakarta South Gateway', description: 'Package is being processed for final delivery route.' });
        steps.push({ status: 'Out for Delivery', date: outForDeliveryDate, location: 'Local Hub Kebayoran', description: 'Courier [Budi] is on the way to your delivery address.' });
    }

    if (status === 'Delivered') {
        steps.push({ status: 'Delivered', date: addDays(orderDate, 3), location: 'Destination Address', description: 'Package delivered. Received by [Dini Cahyo] (Owner).' });
    }

    return {
        tracking: steps.reverse(),
        courierName: expedition,
        shippedDate: shippedOn,
        estimatedArrival: estimatedArrival
    };
};

const generatePaymentTimeline = (orderDateStr: string): TrackingStep[] => {
    const orderDate = new Date(orderDateStr);
    const addMinutes = (d: Date, mins: number) => {
        const date = new Date(d);
        date.setMinutes(date.getMinutes() + mins);
        return date.toISOString().replace('T', ' ').substring(0, 16);
    };

    return [
        { status: 'Payment Successful', date: addMinutes(orderDate, 15), description: 'Your payment was successfully verified by our system. Funding received.' },
        { status: 'Verifying Payment', date: addMinutes(orderDate, 5), description: 'System is verifying your transaction with the provider. Please do not close the window.' },
        { status: 'Waiting for Payment', date: orderDateStr.replace('T', ' ').substring(0, 16), description: 'Payment instructions sent to your email and mobile device.' },
    ];
};

export const INITIAL_USER: User = {
    id: 'u1',
    name: 'Dini Cahyo',
    email: 'dini.cahyo@example.com',
    phone: '+62 812 3456 7890',
    viewedProducts: ['p-1', 'p-2'],
    cartItems: [],
    reservations: [],
    orders: [
        {
            id: 'ord-101',
            date: '2026-02-15T10:30:00Z',
            status: 'Delivered',
            paymentMethod: 'GoPay',
            paymentTimeline: generatePaymentTimeline('2026-02-15T10:30:00Z'),
            items: [{ productId: 'p-1', quantity: 1, price: 199000, ...generateLogistics('Delivered', '2026-02-15T10:30:00Z') }],
        },
        {
            id: 'ord-102',
            date: '2026-02-20T10:00:00Z',
            status: 'Shipped',
            paymentMethod: 'BCA Virtual Account',
            paymentTimeline: generatePaymentTimeline('2026-02-20T10:00:00Z'),
            items: [{ productId: 'p-15', quantity: 2, price: 399000, ...generateLogistics('Shipped', '2026-02-20T10:00:00Z') }],
        },
        {
            id: 'ord-103',
            date: '2026-02-20T10:00:00Z',
            status: 'Processing',
            paymentMethod: 'OVO',
            paymentTimeline: generatePaymentTimeline('2026-02-20T10:00:00Z'),
            items: [{ productId: 'p-5', quantity: 1, price: 429000, ...generateLogistics('Processing', '2026-02-20T10:00:00Z') }],
        },
    ],
    visitHistory: [
        { date: '2026-02-19T14:20:00Z', action: 'Browsed New Arrivals' },
        { date: '2026-02-20T09:15:00Z', action: 'Added items to cart' },
    ],
    role: 'user',
    registeredAt: '2026-01-10T08:00:00Z',
    loginLogs: [
        { date: '2026-02-24T09:00:00Z', ip: '192.168.1.1', device: 'Chrome / Windows' },
        { date: '2026-02-23T10:30:00Z', ip: '192.168.1.1', device: 'Chrome / Windows' },
        { date: '2026-02-20T09:15:00Z', ip: '192.168.1.1', device: 'Chrome / Windows' },
    ],
};

export const INITIAL_ADMIN: User = {
    id: 'u-admin',
    name: 'Admin Jiniso',
    email: 'admin@jiniso.co.id',
    phone: '+62 811 0000 0000',
    viewedProducts: [],
    cartItems: [],
    reservations: [],
    orders: [],
    visitHistory: [],
    role: 'admin',
    registeredAt: '2025-12-01T00:00:00Z',
    loginLogs: [
        { date: '2026-02-24T08:00:00Z', ip: '10.0.0.1', device: 'Edge / MacOS' },
    ],
};

export const USERS: User[] = [
    INITIAL_USER,
    INITIAL_ADMIN,
    {
        id: 'u2',
        name: 'Andi Pratama',
        email: 'andi.pratama@example.com',
        phone: '+62 813 9876 5432',
        viewedProducts: ['p-5'],
        cartItems: [],
        reservations: [],
        orders: [],
        visitHistory: [{ date: '2026-02-22T11:00:00Z', action: 'Login' }],
        role: 'user',
        registeredAt: '2026-02-01T15:30:00Z',
        loginLogs: [{ date: '2026-02-22T11:00:00Z', ip: '172.16.0.4', device: 'Safari / iPhone' }],
    }
];

export const INITIAL_TIMELINE: TimelineEvent[] = [
    { id: 'evt-1', date: '2026-02-15T10:30:00Z', type: 'purchased', productId: 'p-1', productName: 'Essential Oversized Tee 1' },
    { id: 'evt-2', date: '2026-02-19T14:20:00Z', type: 'viewed', productId: 'p-2', productName: 'Slim Fit Dark Indigo Jeans 2' },
];
