import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './auth';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

const router = Router();
const prisma = new PrismaClient();

// Middleware to protect routes
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Create a new order (Protected)
router.post('/orders', authenticateToken, async (req: any, res: any) => {
  try {
    const { items, addressId, paymentMethod } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain items' });
    }

    const customerId = req.user.customerId || req.user.userId;

    // Calculate total price based on product IDs from database to prevent tampering
    let total = 0;
    const orderItems = [];

    const productIds = items.map((i: any) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    const productMap = new Map(products.map(p => [p.id, p]));

    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) return res.status(400).json({ error: `Product ${item.productId} not found` });
      
      const itemTotal = Number(product.price) * item.quantity;
      total += itemTotal;
      
      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }

    // Add fixed delivery fee if total < 500
    if (total < 500) {
      total += 40;
    }

    // Handle wallet payment
    if (paymentMethod === 'wallet') {
      const user = await prisma.customer.findUnique({ where: { id: customerId } });
      if (!user) return res.status(404).json({ error: 'User not found' });
      if (Number(user.walletBalance) < total) {
        return res.status(400).json({ error: 'Insufficient wallet balance' });
      }
      
      // Create the order and items in a transaction, and deduct wallet balance
      const [order] = await prisma.$transaction([
        prisma.order.create({
          data: {
            customerId,
            status: 'Processing',
            total,
            addressId: addressId || null,
            items: {
              create: orderItems
            }
          },
          include: { items: true }
        }),
        prisma.customer.update({
          where: { id: customerId },
          data: { walletBalance: Number(user.walletBalance) - total }
        })
      ]);
      return res.json({ success: true, order });
    }

    // Create the order and items for non-wallet payments
    const order = await prisma.order.create({
      data: {
        customerId,
        status: 'Processing',
        total,
        addressId: addressId || null,
        items: {
          create: orderItems
        }
      },
      include: { items: true }
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user's own orders (Protected)
router.get('/user/orders', authenticateToken, async (req: any, res: any) => {
  try {
    const customerId = req.user.customerId || req.user.userId;
    const orders = await prisma.order.findMany({
      where: { customerId },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your orders' });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, inventory: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by id
router.get('/products/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { category: true, inventory: true }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Admin: Add a new product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, oldPrice, categoryId, imageUrl, stock } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        oldPrice,
        categoryId: parseInt(categoryId),
        imageUrl,
        inventory: {
          create: {
            stock: parseInt(stock) || 0,
            minQuantity: 5
          }
        }
      },
      include: { category: true, inventory: true }
    });
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Admin: Update a product
router.put('/products/:id', async (req, res) => {
  try {
    const { name, description, price, oldPrice, categoryId, imageUrl, stock } = req.body;
    
    // Check if inventory exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { inventory: true }
    });
    
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        description,
        price,
        oldPrice,
        categoryId: parseInt(categoryId),
        imageUrl,
        inventory: existingProduct.inventory ? {
          update: {
            stock: parseInt(stock) || 0
          }
        } : {
          create: {
            stock: parseInt(stock) || 0,
            minQuantity: 5
          }
        }
      },
      include: { category: true, inventory: true }
    });
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Admin: Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // Delete inventory first, if any
    await prisma.inventory.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get products by category name
router.get('/categories/:name', async (req, res) => {
  try {
    const requestedName = decodeURIComponent(req.params.name).toLowerCase();
    
    // Fetch all categories lightweight to do a case-insensitive match
    const allCategories = await prisma.category.findMany({
      select: { id: true, name: true }
    });
    
    const matchingCategory = allCategories.find(c => c.name.toLowerCase() === requestedName);
    
    if (!matchingCategory) return res.status(404).json({ error: 'Category not found' });
    
    const category = await prisma.category.findUnique({
      where: { id: matchingCategory.id },
      include: { products: true }
    });
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Admin: Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { customer: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Admin: Update order status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const order = await prisma.order.update({
      where: { id: parseInt(req.params.id) },
      data: { status }
    });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Admin: Get all customers with their stats
router.get('/customers', async (req, res) => {
  try {
    const users = await prisma.customer.findMany({
      include: { 
        _count: { select: { orders: true } },
        orders: { select: { total: true } }
      }
    });
    
    // Map to customer format
    const customers = users.map(user => {
      const totalOrders = user._count.orders;
      const totalSpent = user.orders.reduce((sum, order) => sum + Number(order.total), 0);
      return {
        id: user.id,
        name: user.name || 'Unknown',
        email: user.email,
        phone: user.phone,
        isActive: user.isActive,
        orders: totalOrders,
        spent: totalSpent
      };
    });
    
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// Admin: Get a single customer by id
router.get('/customers/:id', async (req, res) => {
  try {
    const user = await prisma.customer.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { orders: true, addresses: true }
    });
    
    if (!user) return res.status(404).json({ error: 'Customer not found' });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

// Admin: Update a customer
router.put('/customers/:id', async (req, res) => {
  try {
    const { name, email } = req.body; // Phone is mocked currently in schema, but we can update name/email
    const user = await prisma.customer.update({
      where: { id: parseInt(req.params.id) },
      data: { name, email }
    });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

// Admin: Delete a customer
router.delete('/customers/:id', async (req, res) => {
  try {
    const customerId = parseInt(req.params.id);
    const user = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { orders: true }
    });

    if (!user) return res.status(404).json({ error: 'Customer not found' });

    if (user.orders.length > 0) {
      await prisma.customer.update({
        where: { id: customerId },
        data: { isActive: false }
      });
      return res.json({ success: true, message: 'Customer disabled due to existing order history.' });
    }

    // Since they have no orders, we can safely delete them (along with any other dependent non-order records if needed, though they shouldn't have any without orders)
    await prisma.customer.delete({ where: { id: customerId } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

// Admin: Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalRevenue = await prisma.order.aggregate({
      _sum: { total: true },
      where: { status: 'Delivered' }
    });
    const activeOrders = await prisma.order.count({
      where: { status: { in: ['Processing', 'Shipped'] } }
    });
    const totalCustomers = await prisma.customer.count();
    const totalProducts = await prisma.product.count();
    
    res.json({
      revenue: Number(totalRevenue._sum.total || 0),
      activeOrders,
      totalCustomers,
      totalProducts
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Create a new message (Public)
router.post('/messages', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    const newMessage = await prisma.message.create({
      data: { name, phone, email, message }
    });
    res.json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Admin: Get all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Admin: Mark message as read
router.put('/messages/:id/read', async (req, res) => {
  try {
    const message = await prisma.message.update({
      where: { id: parseInt(req.params.id) },
      data: { status: 'Read' }
    });
    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// Admin: Get Analytics Data
router.get('/analytics', async (req, res) => {
  try {
    const [orders, deliveredOrders, categories] = await Promise.all([
      prisma.order.findMany({
        select: { status: true }
      }),
      prisma.order.findMany({
        where: { status: 'Delivered' },
        select: { 
          total: true, 
          createdAt: true,
          items: {
            select: {
              quantity: true,
              price: true,
              product: {
                select: { id: true, name: true, categoryId: true }
              }
            }
          }
        }
      }),
      prisma.category.findMany({ select: { id: true, name: true } })
    ]);

    const categoryMap = new Map(categories.map(c => [c.id, c.name]));

    const totalRevenue = deliveredOrders.reduce((sum, order) => sum + Number(order.total), 0);
    const totalOrders = orders.length;
    const avgOrderValue = deliveredOrders.length > 0 ? totalRevenue / deliveredOrders.length : 0;

    const totalCustomers = await prisma.customer.count();

    // Order status breakdown
    const orderStatusCount = orders.reduce((acc: any, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    const orderStatusData = Object.keys(orderStatusCount).map(key => ({
      name: key,
      value: orderStatusCount[key]
    }));

    // Revenue by category and Top Products
    const categoryRevenue: any = {};
    const productRevenue: any = {};
    
    deliveredOrders.forEach(order => {
      order.items.forEach((item: any) => {
        const prod = item.product;
        const revenue = Number(item.price) * item.quantity;
        const catName = categoryMap.get(prod.categoryId) || 'Unknown';
        
        categoryRevenue[catName] = (categoryRevenue[catName] || 0) + revenue;
        
        if (!productRevenue[prod.id]) {
          productRevenue[prod.id] = { name: prod.name, revenue: 0, sales: 0 };
        }
        productRevenue[prod.id].revenue += revenue;
        productRevenue[prod.id].sales += item.quantity;
      });
    });

    const categoryData = Object.keys(categoryRevenue).map(key => ({
      name: key,
      value: categoryRevenue[key]
    }));

    const topProducts = Object.values(productRevenue)
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 5);

    // Sales over last 7 days mock data based on total revenue trend
    const last7Days: any = {};
    const today = new Date();
    for(let i=6; i>=0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      last7Days[dateString] = 0;
    }

    deliveredOrders.forEach(order => {
      const dateString = new Date(order.createdAt).toISOString().split('T')[0];
      if (last7Days[dateString] !== undefined) {
        last7Days[dateString] += Number(order.total);
      }
    });

    const salesTrend = Object.keys(last7Days).map(date => ({
      date: date.substring(5), // MM-DD
      revenue: last7Days[date]
    }));

    res.json({
      metrics: {
        totalRevenue,
        totalOrders,
        avgOrderValue,
        totalCustomers
      },
      salesTrend,
      orderStatusData,
      categoryData,
      topProducts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Wallet: Get current balance and top-up requests
router.get('/wallet', authenticateToken, async (req: any, res: any) => {
  try {
    const customerId = req.user.customerId || req.user.userId;
    const user = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { walletTopUps: { orderBy: { createdAt: 'desc' } } }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ balance: user.walletBalance, topUps: user.walletTopUps });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wallet' });
  }
});

// Wallet: Submit top-up request
router.post('/wallet/topup', authenticateToken, upload.single('screenshot'), async (req: any, res: any) => {
  try {
    const customerId = req.user.customerId || req.user.userId;
    const { amount } = req.body;
    if (!amount || !req.file) {
      return res.status(400).json({ error: 'Amount and screenshot are required' });
    }

    const screenshotUrl = '/public/uploads/' + req.file.filename;

    const topUp = await prisma.walletTopUp.create({
      data: {
        customerId,
        amount: parseFloat(amount),
        screenshotUrl,
        status: 'Pending'
      }
    });

    res.json({ success: true, topUp });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit top-up request' });
  }
});

// Admin: Get all wallet requests
router.get('/admin/wallet-requests', async (req, res) => {
  try {
    const requests = await prisma.walletTopUp.findMany({
      include: { customer: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wallet requests' });
  }
});

// Admin: Approve wallet request
router.post('/admin/wallet-requests/:id/approve', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const request = await prisma.walletTopUp.findUnique({ where: { id } });
    
    if (!request) return res.status(404).json({ error: 'Request not found' });
    if (request.status !== 'Pending') return res.status(400).json({ error: 'Request is already processed' });

    // Update request status and user balance in a transaction
    const [updatedRequest, user] = await prisma.$transaction([
      prisma.walletTopUp.update({
        where: { id },
        data: { status: 'Approved' }
      }),
      prisma.customer.update({
        where: { id: request.customerId },
        data: { walletBalance: { increment: request.amount } }
      })
    ]);

    res.json({ success: true, request: updatedRequest, newBalance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve request' });
  }
});

// Admin: Reject wallet request
router.post('/admin/wallet-requests/:id/reject', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const request = await prisma.walletTopUp.findUnique({ where: { id } });
    
    if (!request) return res.status(404).json({ error: 'Request not found' });
    if (request.status !== 'Pending') return res.status(400).json({ error: 'Request is already processed' });

    const updatedRequest = await prisma.walletTopUp.update({
      where: { id },
      data: { status: 'Rejected' }
    });

    res.json({ success: true, request: updatedRequest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject request' });
  }
});

export default router;
