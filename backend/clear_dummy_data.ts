import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clearDummyData() {
  console.log('Clearing dummy data (Orders, Users, etc.)...');
  
  try {
    // Delete dependent records first to avoid foreign key constraints
    console.log('Deleting OrderItems...');
    await prisma.orderItem.deleteMany();
    
    console.log('Deleting Orders...');
    await prisma.order.deleteMany();
    
    console.log('Deleting Addresses...');
    await prisma.address.deleteMany();
    
    console.log('Deleting Reviews...');
    await prisma.review.deleteMany();
    
    console.log('Deleting Wishlists...');
    await prisma.wishlist.deleteMany();
    
    console.log('Deleting Subscriptions...');
    await prisma.subscription.deleteMany();
    
    console.log('Deleting Users...');
    await prisma.user.deleteMany();
    
    console.log('Dummy data cleared successfully! Product catalog was kept intact.');
  } catch (e) {
    console.error('Error clearing data:', e);
  } finally {
    await prisma.$disconnect();
  }
}

clearDummyData();
