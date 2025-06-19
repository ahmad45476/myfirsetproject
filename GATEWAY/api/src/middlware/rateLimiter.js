// GATEWAY/middleware/rateLimiter.js

const rateLimit = require('express-rate-limit');

// تحديد إعدادات Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // نافذة زمنية: 15 دقيقة
  max: 100,                 // عدد الطلبات المسموح بها لكل IP خلال النافذة
  message: {
    status: 429,
    error: 'Too many requests',
    message: 'لقد أرسلت الكثير من الطلبات. يرجى المحاولة لاحقًا.',
  },
  standardHeaders: true,    // إرجاع معلومات الـ Rate Limit في الهيدر
  legacyHeaders: false,     // تعطيل X-RateLimit-* القديمة
});

module.exports = limiter;
