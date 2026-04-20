const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const User = db.User;

class AuthService {
  async login(email, password) {
    if (!email || !password) {
      throw new Error("EMAIL_AND_PASSWORD_REQUIRED");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const token = jwt.sign(
      { user_id: user.id, user_type: "user", is_admin: false },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    return { token };
  }
}

module.exports = new AuthService();