const cors = require("cors");
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimiter = require('./middlware/rateLimiter');

const app = express();

app.use(rateLimiter);
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }));

// Auth-User Service
app.use('/api/auth', createProxyMiddleware({
  target: 'http://localhost:4000',
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    console.log(`[GATEWAY] Proxying to Auth-User Service: ${req.method} ${req.originalUrl}`);
  }
}));

app.use('/api/users', createProxyMiddleware({
  target: 'http://localhost:4000',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/users',
  },
  onProxyReq: (proxyReq, req) => {
    console.log(`[GATEWAY] Proxying to Auth-User Service: ${req.method} ${req.originalUrl}`);
  }
}));

// Interaction Service
app.use('/api/interaction', createProxyMiddleware({
  target: 'http://localhost:4001',
  changeOrigin: true,
}));

// Rating Service
app.use('/api/rating', createProxyMiddleware({
  target: 'http://localhost:4002',
  changeOrigin: true,
}));

// Artwork Service
app.use('/api/artworks', createProxyMiddleware({
  target: 'http://localhost:4003',
  changeOrigin: true,
}));

// Post Service
app.use('/api/posts', createProxyMiddleware({
  target: 'http://localhost:5002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/posts': '', // مهم جدًا حتى لا يتكرر المسار
  },
  onProxyReq: (proxyReq, req) => {
    console.log(`[GATEWAY] Proxying to Post Service: ${req.method} ${req.originalUrl}`);
  }
}));

// Search Service
app.use('/api/search', createProxyMiddleware({
  target: 'http://localhost:4006',
  changeOrigin: true,
}));
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }));
// تشغيل الـ Gateway
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
