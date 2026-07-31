import rateLimit from 'express-rate-limit';

// General API rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter rate limiting for Safeguarding reports (prevent spam on sensitive endpoint)
export const safeguardingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 reports per hour
  message: 'Too many reports submitted from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
