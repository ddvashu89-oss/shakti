import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Adding more products...');

  // Get categories
  const catAtta = await prisma.category.findUnique({ where: { name: 'Rice & Atta' } });
  const catDairy = await prisma.category.findUnique({ where: { name: 'Dairy' } });
  const catMasale = await prisma.category.findUnique({ where: { name: 'Masale' } });
  const catSnacks = await prisma.category.findUnique({ where: { name: 'Snacks' } });
  const catVegetables = await prisma.category.findUnique({ where: { name: 'Vegetables' } });

  if (!catAtta || !catDairy || !catMasale || !catSnacks || !catVegetables) {
    throw new Error('Categories missing!');
  }

  const newProducts = [
    // Rice & Atta
    { name: 'India Gate Basmati Rice 5kg', description: 'Premium long grain rice', price: 450, oldPrice: 500, rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80', categoryId: catAtta.id },
    { name: 'Fortune Chakki Fresh Atta 10kg', description: '100% Atta, 0% Maida', price: 410, oldPrice: 450, rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1574316071802-0d684efa7ab5?w=500&q=80', categoryId: catAtta.id },
    
    // Dairy
    { name: 'Amul Butter 500g', description: 'Pasteurised Butter', price: 260, oldPrice: 265, rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1589134712653-524f2b1a8a25?w=500&q=80', categoryId: catDairy.id },
    { name: 'Mother Dairy Paneer 200g', description: 'Fresh Malai Paneer', price: 85, oldPrice: 90, rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc3?w=500&q=80', categoryId: catDairy.id },
    { name: 'Amul Cheese Slices 200g', description: 'Processed Cheese Slices', price: 130, oldPrice: 135, rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1612204070659-3cb31057db37?w=500&q=80', categoryId: catDairy.id },

    // Masale
    { name: 'MDH Garam Masala 100g', description: 'Authentic Indian Spice Blend', price: 82, oldPrice: 85, rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80', categoryId: catMasale.id },
    { name: 'Everest Coriander Powder 200g', description: 'Dhaniya Powder', price: 65, oldPrice: 70, rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80', categoryId: catMasale.id },
    
    // Snacks
    { name: 'Haldiram Bhujia 400g', description: 'Crispy Indian Snack', price: 105, oldPrice: 110, rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80', categoryId: catSnacks.id },
    { name: 'Britannia Good Day 250g', description: 'Butter Cookies', price: 40, oldPrice: 45, rating: 4.5, imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80', categoryId: catSnacks.id },
    { name: 'Kurkure Masala Munch 90g', description: 'Spicy Crunchy Snack', price: 20, oldPrice: 20, rating: 4.3, imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80', categoryId: catSnacks.id },

    // Vegetables
    { name: 'Fresh Potatoes 1kg', description: 'Farm Fresh Aloo', price: 30, oldPrice: 40, rating: 4.5, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80', categoryId: catVegetables.id },
    { name: 'Fresh Onions 1kg', description: 'Red Onions', price: 45, oldPrice: 55, rating: 4.4, imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80', categoryId: catVegetables.id },
    { name: 'Green Chillies 250g', description: 'Spicy Green Chillies', price: 20, oldPrice: 25, rating: 4.6, imageUrl: 'https://images.unsplash.com/photo-1588267253457-3a0cb1b6a3b2?w=500&q=80', categoryId: catVegetables.id }
  ];

  for (const p of newProducts) {
    const exists = await prisma.product.findFirst({ where: { name: p.name } });
    if (!exists) {
      await prisma.product.create({ data: p });
      console.log(`Added: ${p.name}`);
    } else {
      console.log(`Skipped (already exists): ${p.name}`);
    }
  }

  console.log('Finished adding products.');
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
