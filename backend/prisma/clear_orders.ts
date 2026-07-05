import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Deleting all order items...");
  await prisma.orderItem.deleteMany({});
  
  console.log("Deleting all orders...");
  await prisma.order.deleteMany({});
  
  console.log("Successfully removed all orders from the database!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
