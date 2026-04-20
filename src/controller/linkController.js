const linkService = require("../service/linkService");
const response = require("../../utils/response");

class LinkController {
  async createLink(req, res) {
    try {
      const { original_url } = req.body;
      const userId = req.body.user_id;

      const result = await linkService.createLink(userId, original_url);

      response.success(req, res, result, req.headers.language || "en", 201);
    } catch (error) {
      console.error("Create link error:", error);
      const messageKey = error.message;
      response.error(req, res, messageKey, req.headers.language || "en", 400);
    }
  }

  async getMyLinks(req, res) {
    try {
      const userId = req.body.user_id;

      const links = await linkService.getUserLinks(userId);

      response.success(req, res, { links }, req.headers.language || "en", 200);
    } catch (error) {
      console.error("Get my links error:", error);
      response.error(req, res, "INTERNAL_SERVER_ERROR", req.headers.language || "en", 500);
    }
  }

  async redirect(req, res) {
    try {
      const { code } = req.params;

      const originalUrl = await linkService.redirect(code);

      res.redirect(originalUrl);
    } catch (error) {
      console.error("Redirect error:", error);
      if (error.message === "LINK_NOT_FOUND") {
        res.status(404).send("Link not found");
      } else {
        res.status(500).send("Internal server error");
      }
    }
  }
}

module.exports = new LinkController();