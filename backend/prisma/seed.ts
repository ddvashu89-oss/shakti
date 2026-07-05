import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

  const productsData = [
    { name: 'Haldi Powder 100g', description: 'Pisa gaya: Aaj subah 6 baje', price: 30, oldPrice: 35, rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?auto=format&fit=crop&w=500&q=80', categoryId: catMasale.id },
    { name: 'Aashirvaad Atta 5kg', description: 'Fresh Chakki Atta', price: 220, oldPrice: 250, rating: 4.8, imageUrl: '/products/aashirvaad_atta.png', categoryId: catAtta.id },
    { name: 'Lal Mirch Powder 100g', description: 'Pisa gaya: Aaj subah 9 baje', price: 40, oldPrice: 45, rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80', categoryId: catMasale.id },
    { name: 'Amul Taaza Milk 1L', description: 'Arrived Today', price: 64, oldPrice: 68, rating: 4.9, imageUrl: '/products/amul_milk.png', categoryId: catDairy.id },
    { name: 'Fresh Tomatoes', description: 'Fresh vegetables', price: 40, oldPrice: 50, rating: 4.5, imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80', categoryId: catVegetables.id },
    { name: 'Lays Magic Masala', description: 'Snacks', price: 20, oldPrice: 20, rating: 4.0, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80', categoryId: catSnacks.id },
    
    // Additional Products
    { name: 'India Gate Basmati Rice 5kg', description: 'Premium long grain rice', price: 450, oldPrice: 500, rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80', categoryId: catAtta.id },
    { name: 'Fortune Chakki Fresh Atta 10kg', description: '100% Atta, 0% Maida', price: 410, oldPrice: 450, rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1574316071802-0d684efa7ab5?w=500&q=80', categoryId: catAtta.id },
    { name: 'Amul Butter 500g', description: 'Pasteurised Butter', price: 260, oldPrice: 265, rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d', categoryId: catDairy.id },
    { name: 'Mother Dairy Paneer 200g', description: 'Fresh Malai Paneer', price: 85, oldPrice: 90, rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d', categoryId: catDairy.id },
    { name: 'Amul Cheese Slices 200g', description: 'Processed Cheese Slices', price: 130, oldPrice: 135, rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d', categoryId: catDairy.id },
    { name: 'MDH Garam Masala 100g', description: 'Authentic Indian Spice Blend', price: 82, oldPrice: 85, rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80', categoryId: catMasale.id },
    { name: 'Everest Coriander Powder 200g', description: 'Dhaniya Powder', price: 65, oldPrice: 70, rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80', categoryId: catMasale.id },
    { name: 'Haldiram Bhujia 400g', description: 'Crispy Indian Snack', price: 105, oldPrice: 110, rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80', categoryId: catSnacks.id },
    { name: 'Britannia Good Day 250g', description: 'Butter Cookies', price: 40, oldPrice: 45, rating: 4.5, imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80', categoryId: catSnacks.id },
    { name: 'Kurkure Masala Munch 90g', description: 'Spicy Crunchy Snack', price: 20, oldPrice: 20, rating: 4.3, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80', categoryId: catSnacks.id },
    { name: 'Fresh Potatoes 1kg', description: 'Farm Fresh Aloo', price: 30, oldPrice: 40, rating: 4.5, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80', categoryId: catVegetables.id },
    { name: 'Fresh Onions 1kg', description: 'Red Onions', price: 45, oldPrice: 55, rating: 4.4, imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80', categoryId: catVegetables.id },
    { name: 'Green Chillies 250g', description: 'Spicy Green Chillies', price: 20, oldPrice: 25, rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1588267253457-3a0cb1b6a3b2?w=500&q=80', categoryId: catVegetables.id }
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
    const user = await prisma.customer.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
    createdUsers.push(user);
  }

  // 4. Create Orders
  const ordersData = [
    { customerId: createdUsers[0].id, status: 'Delivered', total: 1240 },
    { customerId: createdUsers[1].id, status: 'Processing', total: 450 },
    { customerId: createdUsers[2].id, status: 'Shipped', total: 2100 },
    { customerId: createdUsers[3].id, status: 'Cancelled', total: 890 },
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
