const validator = require("validator");

class ValidationMiddleware {
  validateLogin(req, res, next) {
    const { email, password } = req.body;

    const errors = [];

    if (!email) {
      errors.push("Email is required");
    } else if (!validator.isEmail(email)) {
      errors.push("Invalid email format");
    }

    if (!password) {
      errors.push("Password is required");
    } else if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: errors.join(", ")
      });
    }

    next();
  }

  validateCreateLink(req, res, next) {
    const { original_url } = req.body;

    const errors = [];

    if (!original_url) {
      errors.push("Original URL is required");
    } else if (!validator.isURL(original_url)) {
      errors.push("Invalid URL format");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: errors.join(", ")
      });
    }

    next();
  }
}

module.exports = new ValidationMiddleware();