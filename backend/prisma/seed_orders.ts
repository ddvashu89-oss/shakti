import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const customers = await prisma.customer.findMany();
  const products = await prisma.product.findMany();
  
  if (customers.length === 0 || products.length === 0) {
    console.log("No customers or products found to seed orders.");
    return;
  }
  
  const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
  
  // Spinner setup
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let frameIndex = 0;
  const spinnerInterval = setInterval(() => {
    // @ts-ignore
    process.stdout.write(`\r\x1b[36m${frames[frameIndex]}\x1b[0m Seeding orders...`);
    frameIndex = (frameIndex + 1) % frames.length;
  }, 80);

  // Seed for last 7 days
  const today = new Date();
  
  for (let i = 0; i <= 6; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    
    // Create 1-3 random orders per day
    const numOrders = Math.floor(Math.random() * 3) + 1;
    for (let o = 0; o < numOrders; o++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];
      
      // Random 1-4 items
      const numItems = Math.floor(Math.random() * 4) + 1;
      let total = 0;
      const orderItems = [];
      
      for (let j = 0; j < numItems; j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const qty = Math.floor(Math.random() * 3) + 1;
        total += Number(product.price) * qty;
        orderItems.push({
          product: { connect: { id: product.id } },
          quantity: qty,
          price: product.price
        });
      }
      
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      await prisma.order.create({
        data: {
          customer: { connect: { id: customer.id } },
          status,
          total,
          createdAt: d,
          updatedAt: d,
          items: {
            create: orderItems
          }
        }
      });
    }
  }
  
  clearInterval(spinnerInterval);
  // @ts-ignore
  process.stdout.write('\r\x1b[32m✔\x1b[0m Dummy orders seeded successfully!       \n');
}

main().catch(console.error).finally(() => prisma.$disconnect());
