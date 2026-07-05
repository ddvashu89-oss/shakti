"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Start seeding...');
    // 1. Create Categories
    const catAtta = await prisma.category.upsert({
        where: { name: 'Rice & Atta' },
        update: {},
        create: { name: 'Rice & Atta' },
    });
    const catDairy = await prisma.category.upsert({
        where: { name: 'Dairy' },
        update: {},
        create: { name: 'Dairy' },
    });
    const catMasale = await prisma.category.upsert({
        where: { name: 'Masale' },
        update: {},
        create: { name: 'Masale' },
    });
    const catSnacks = await prisma.category.upsert({
        where: { name: 'Snacks' },
        update: {},
        create: { name: 'Snacks' },
    });
    const catVegetables = await prisma.category.upsert({
        where: { name: 'Vegetables' },
        update: {},
        create: { name: 'Vegetables' },
    });
    // 2. Create Products
    const productsData = [
        { name: 'Haldi Powder 100g', description: 'Pisa gaya: Aaj subah 6 baje', price: 30, oldPrice: 35, rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?auto=format&fit=crop&w=500&q=80', categoryId: catMasale.id },
        { name: 'Aashirvaad Atta 5kg', description: 'Fresh Chakki Atta', price: 220, oldPrice: 250, rating: 4.8, imageUrl: '/products/aashirvaad_atta.png', categoryId: catAtta.id },
        { name: 'Lal Mirch Powder 100g', description: 'Pisa gaya: Aaj subah 9 baje', price: 40, oldPrice: 45, rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80', categoryId: catMasale.id },
        { name: 'Amul Taaza Milk 1L', description: 'Arrived Today', price: 64, oldPrice: 68, rating: 4.9, imageUrl: '/products/amul_milk.png', categoryId: catDairy.id },
        { name: 'Fresh Tomatoes', description: 'Fresh vegetables', price: 40, oldPrice: 50, rating: 4.5, imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80', categoryId: catVegetables.id },
        { name: 'Lays Magic Masala', description: 'Snacks', price: 20, oldPrice: 20, rating: 4.0, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80', categoryId: catSnacks.id },
    ];
    for (const p of productsData) {
        await prisma.product.create({ data: p });
    }
    // 3. Create Users
    const usersData = [
        { email: 'rahul.s@example.com', name: 'Rahul Sharma', password: 'password123' },
        { email: 'priya.p@example.com', name: 'Priya Patel', password: 'password123' },
        { email: 'amit.k@example.com', name: 'Amit Kumar', password: 'password123' },
        { email: 'neha.s@example.com', name: 'Neha Singh', password: 'password123' },
    ];
    const createdUsers = [];
    for (const u of usersData) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: u,
        });
        createdUsers.push(user);
    }
    // 4. Create Orders
    const ordersData = [
        { userId: createdUsers[0].id, status: 'Delivered', total: 1240 },
        { userId: createdUsers[1].id, status: 'Processing', total: 450 },
        { userId: createdUsers[2].id, status: 'Shipped', total: 2100 },
        { userId: createdUsers[3].id, status: 'Cancelled', total: 890 },
    ];
    for (const o of ordersData) {
        await prisma.order.create({ data: o });
    }
    console.log('Seeding finished.');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    throw e;
});
