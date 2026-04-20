const db = require("../config/database");
const Link = db.Link;
const crypto = require("crypto");

class LinkService {
  async createLink(userId, originalUrl) {
    if (!originalUrl) {
      throw new Error("ORIGINAL_URL_REQUIRED");
    }

    // URL validation will be done in middleware
    const shortCode = crypto.randomBytes(4).toString('hex'); // Generate 8 character short code

    const link = await Link.create({
      user_id: userId,
      original_url: originalUrl,
      short_code: shortCode,
      click_count: 0
    });

    return {
      id: link.id,
      short_code: link.short_code,
      original_url: link.original_url
    };
  }

  async getUserLinks(userId) {
    const links = await Link.findAll({
      where: { user_id: userId },
      attributes: ['id', 'original_url', 'short_code', 'click_count', 'created_at'],
      order: [['created_at', 'DESC']]
    });

    return links;
  }

  async redirect(shortCode) {
    const link = await Link.findOne({ where: { short_code: shortCode } });
    if (!link) {
      throw new Error("LINK_NOT_FOUND");
    }

    await link.increment('click_count');

    return link.original_url;
  }
}

module.exports = new LinkService();