class RateLimitMiddleware {
  constructor() {
    this.requests = new Map();
  }

  redirectRateLimit(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 10;

    if (!this.requests.has(ip)) {
      this.requests.set(ip, []);
    }

    const userRequests = this.requests.get(ip);

    // Remove old requests outside the window
    const validRequests = userRequests.filter(time => now - time < windowMs);

    if (validRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: "Too many requests. Please try again later."
      });
    }

    validRequests.push(now);
    this.requests.set(ip, validRequests);

    next();
  }
}

module.exports = new RateLimitMiddleware();