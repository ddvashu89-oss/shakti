const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.category.findMany().then(c => {
  console.log(c);
}).catch(e => console.error(e)).finally(() => prisma.$disconnect());
