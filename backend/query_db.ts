import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const customers = await prisma.customer.findMany();
  console.log('Customers:', customers);

  const users = await prisma.user.findMany();
  console.log('Users:', users);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
