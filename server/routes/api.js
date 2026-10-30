import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbStore } from '../config/database.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'aura_super_secret_jwt_key_998877665544332211';

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// ----------------------------------------------------
// 1. AUTHENTICATION ROUTES
// ----------------------------------------------------
router.post('/auth/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const existingUser = dbStore.users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: `usr_${Date.now()}`,
      fullName: fullName || 'Luxury Client',
      email,
      passwordHash: hashedPassword,
      role: 'customer',
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`,
      createdAt: new Date().toISOString()
    };

    dbStore.users.push(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
    
    const { passwordHash, ...userWithoutPassword } = newUser;
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: 'Server registration error', error: error.message });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = dbStore.users.find(u => u.email === email);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    const { passwordHash, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: 'Server login error', error: error.message });
  }
});

router.get('/auth/me', authenticateToken, (req, res) => {
  const user = dbStore.users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { passwordHash, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

// ----------------------------------------------------
// 2. PRODUCTS ROUTES
// ----------------------------------------------------
router.get('/products', (req, res) => {
  let { category, search, minPrice, maxPrice, sort } = req.query;
  let result = [...dbStore.products];

  if (category && category !== 'All') {
    result = result.filter(p => p.category.toLowerCase() === category.toString().toLowerCase());
  }

  if (search) {
    const q = search.toString().toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  if (minPrice) {
    result = result.filter(p => p.price >= parseFloat(minPrice.toString()));
  }

  if (maxPrice) {
    result = result.filter(p => p.price <= parseFloat(maxPrice.toString()));
  }

  if (sort === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  }

  res.json(result);
});

router.get('/products/:id', (req, res) => {
  const product = dbStore.products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

router.post('/products', (req, res) => {
  try {
    const { name, tagline, price, comparePrice, category, stock, material, warranty, colors, images, description } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    const newProduct = {
      id: `aura-${Date.now()}`,
      name,
      tagline: tagline || 'Precision Spatial Innovation',
      price: Number(price),
      comparePrice: comparePrice ? Number(comparePrice) : Number(price) + 200,
      category,
      rating: 5.0,
      reviewCount: 1,
      stock: stock ? Number(stock) : 10,
      isFeatured: true,
      material: material || 'Titanium Grade 5',
      warranty: warranty || '3-Year Platinum Warranty',
      colors: colors || ['Obsidian Black', 'Titanium Silver'],
      images: images || ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'],
      description: description || 'High-precision spatial engineering.'
    };

    dbStore.products.unshift(newProduct);
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

router.delete('/products/:id', (req, res) => {
  const index = dbStore.products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  const deleted = dbStore.products.splice(index, 1);
  res.json({ success: true, deleted: deleted[0] });
});

// ----------------------------------------------------
// 3. ORDERS & CHECKOUT ROUTES
// ----------------------------------------------------
router.get('/orders', (req, res) => {
  res.json(dbStore.orders);
});

router.post('/orders', (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount } = req.body;
    
    const newOrder = {
      id: `AUR-${Math.floor(100000 + Math.random() * 900000)}`,
      items: items || [],
      shippingAddress: shippingAddress || {},
      paymentMethod: paymentMethod || 'Credit Card Express',
      totalAmount: totalAmount || 0,
      status: 'Processing',
      paymentStatus: 'Paid',
      trackingNumber: `TRK-AURA-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString()
    };

    dbStore.orders.unshift(newOrder);
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error processing order', error: error.message });
  }
});

router.patch('/orders/:id', (req, res) => {
  const order = dbStore.orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (req.body.status) order.status = req.body.status;
  if (req.body.paymentStatus) order.paymentStatus = req.body.paymentStatus;
  res.json({ success: true, order });
});

// ----------------------------------------------------
// 4. REVIEWS ROUTES
// ----------------------------------------------------
router.get('/reviews', (req, res) => {
  res.json(dbStore.reviews);
});

router.post('/reviews', (req, res) => {
  const { userName, userAvatar, rating, title, comment } = req.body;
  const newReview = {
    id: `rev-${Date.now()}`,
    userName: userName || 'Luxury Client',
    userAvatar: userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    rating: Number(rating) || 5,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    title: title || 'Exceptional Quality',
    comment: comment || '',
    verified: true
  };
  dbStore.reviews.unshift(newReview);
  res.status(201).json({ success: true, review: newReview });
});

// ----------------------------------------------------
// 5. ADMIN ANALYTICS
// ----------------------------------------------------
router.get('/admin/analytics', (req, res) => {
  const totalRevenue = dbStore.orders.reduce((sum, o) => sum + o.totalAmount, 1284500);
  const totalOrders = dbStore.orders.length + 842;
  const totalProducts = dbStore.products.length;
  
  res.json({
    totalRevenue,
    totalOrders,
    totalProducts,
    activeUsers: 14209,
    conversionRate: 4.82,
    salesTrend: [
      { month: 'Jan', revenue: 180000 },
      { month: 'Feb', revenue: 220000 },
      { month: 'Mar', revenue: 310000 },
      { month: 'Apr', revenue: 290000 },
      { month: 'May', revenue: 450000 },
      { month: 'Jun', revenue: 520000 },
    ]
  });
});

export default router;
