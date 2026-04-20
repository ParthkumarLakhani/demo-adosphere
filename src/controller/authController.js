const authService = require("../service/authService");
const response = require("../../utils/response");

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      response.success(req, res, result, req.headers.language || "en", 200);
    } catch (error) {
      console.error("Login error:", error);
      const messageKey = error.message;
      response.error(req, res, messageKey, req.headers.language || "en", 401);
    }
  }
}

module.exports = new AuthController();