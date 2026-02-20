export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: 'Men' | 'Women' | 'Kids' | 'Accessories' | 'Collections';
    subCategory: 'Tops' | 'Bottoms' | 'Outerwear' | 'Innerwear' | 'Accessories';
    isFeatured?: boolean;
    stockPerStore: {
        storeId: string;
        stock: number;
    }[];
}

export interface Store {
    id: string;
    name: string;
    location: string;
}

export interface Testimonial {
    id: string;
    user: string;
    content: string;
    rating: number;
    date?: string;
}

export interface Step {
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
        tracking?: Step[];
        courierName?: string;
        estimatedArrival?: string;
        shippedDate?: string;
    }[];
    status: 'Delivered' | 'Processing' | 'Shipped';
    paymentTimeline?: Step[];
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
}

export interface TimelineEvent {
    id: string;
    date: string;
    type: 'viewed' | 'cart' | 'reserved' | 'purchased';
    productId: string;
    productName: string;
}

export const STORES: Store[] = [
    { id: 's1', name: 'Jiniso Central Mall', location: 'Level 2, South Wing' },
    { id: 's2', name: 'Jiniso Metro Square', location: 'Ground Floor, Unit 12' },
    { id: 's3', name: 'Jiniso Urban Gallery', location: 'Level 1, North Wing' },
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
    { type: 'Oversized Tee', price: 199000, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=60', cat: 'Women' as const, sub: 'Tops' as const },
    { type: 'Slim Fit Jeans', price: 499000, img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60', cat: 'Men' as const, sub: 'Bottoms' as const },
    { type: 'Canvas Tote', price: 89000, img: 'https://images.unsplash.com/photo-1544816153-09730556637e?w=800&auto=format&fit=crop&q=60', cat: 'Accessories' as const, sub: 'Accessories' as const },
    { type: 'Tech Hoodie', price: 359000, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60', cat: 'Collections' as const, sub: 'Outerwear' as const },
    { type: 'Cargo Pants', price: 429000, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=60', cat: 'Men' as const, sub: 'Bottoms' as const },
    { type: 'Denim Jacket', price: 599000, img: 'https://images.unsplash.com/photo-1576905341935-422730623643?w=800&auto=format&fit=crop&q=60', cat: 'Women' as const, sub: 'Outerwear' as const },
    { type: 'Beanie Hat', price: 129000, img: 'https://images.unsplash.com/photo-1576871337622-98d48d365da2?w=800&auto=format&fit=crop&q=60', cat: 'Accessories' as const, sub: 'Accessories' as const },
    { type: 'Cotton Socks', price: 49000, img: 'https://images.unsplash.com/photo-1582966298438-641ff1ec8d7d?w=800&auto=format&fit=crop&q=60', cat: 'Accessories' as const, sub: 'Accessories' as const },
    { type: 'Windbreaker', price: 459000, img: 'https://images.unsplash.com/photo-1620331311520-246422ff83f9?w=800&auto=format&fit=crop&q=60', cat: 'Collections' as const, sub: 'Outerwear' as const },
    { type: 'Linen Shirt', price: 289000, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60', cat: 'Men' as const, sub: 'Tops' as const },
    { type: 'Polo Shirt', price: 249000, img: 'https://images.unsplash.com/photo-1586363104864-50e2246b621e?w=800&auto=format&fit=crop&q=60', cat: 'Men' as const, sub: 'Tops' as const },
    { type: 'Chino Pants', price: 399000, img: 'https://images.unsplash.com/photo-1473966968600-fa804b869628?w=800&auto=format&fit=crop&q=60', cat: 'Men' as const, sub: 'Bottoms' as const },
    { type: 'Sweatshirt', price: 299000, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60', cat: 'Women' as const, sub: 'Tops' as const },
    { type: 'Skater Skirt', price: 189000, img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=60', cat: 'Women' as const, sub: 'Bottoms' as const },
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
            price: baseProduct.price + (Math.floor(Math.random() * 20) * 1000),
            image: baseProduct.img,
            category: baseProduct.cat,
            subCategory: baseProduct.sub,
            isFeatured: i <= 8,
            description: `Description for ${prefix} ${baseProduct.type}. This is a high-quality product part of our seasonal collection. Designed for versatility and long-lasting wear.`,
            stockPerStore: [
                { storeId: 's1', stock: Math.floor(Math.random() * 25) },
                { storeId: 's2', stock: Math.floor(Math.random() * 25) },
                { storeId: 's3', stock: Math.floor(Math.random() * 25) },
            ],
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

    const steps: Step[] = [
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

const generatePaymentTimeline = (orderDateStr: string): Step[] => {
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
    cartItems: [{ productId: 'p-3', quantity: 1 }],
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
};

export const INITIAL_TIMELINE: TimelineEvent[] = [
    { id: 'evt-1', date: '2026-02-15T10:30:00Z', type: 'purchased', productId: 'p-1', productName: 'Essential Oversized Tee 1' },
    { id: 'evt-2', date: '2026-02-19T14:20:00Z', type: 'viewed', productId: 'p-2', productName: 'Slim Fit Dark Indigo Jeans 2' },
];
