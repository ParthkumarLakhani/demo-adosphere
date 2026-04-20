class ResponseUtil {
  success(req, res, data, language, statusCode) {
    res.status(statusCode || 200).json({
      success: true,
      data,
      message: this.getMessage("SUCCESS", language)
    });
  }

  error(req, res, messageKey, language, statusCode) {
    res.status(statusCode || 400).json({
      success: false,
      error: this.getMessage(messageKey, language)
    });
  }

  getMessage(key, language) {
    // Simple message mapping - can be expanded
    const messages = {
      en: {
        SUCCESS: "Success",
        EMAIL_AND_PASSWORD_REQUIRED: "Email and password are required",
        INVALID_CREDENTIALS: "Invalid credentials",
        INTERNAL_SERVER_ERROR: "Internal server error",
        ORIGINAL_URL_REQUIRED: "Original URL is required",
        INVALID_URL: "Invalid URL format",
        USER_NOT_FOUND: "User not found",
        TOKEN_EXPIRED: "Token expired",
        TOKEN_MALFORMED: "Token malformed",
        INVALID_TOKEN: "Invalid token",
        INVALID_REQUEST_HEADERS: "Invalid request headers",
        LINK_NOT_FOUND: "Link not found"
      }
    };

    return messages[language]?.[key] || key;
  }
}

module.exports = new ResponseUtil();
