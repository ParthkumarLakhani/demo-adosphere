const jwt = require("jsonwebtoken");
const response = require("./response");
const db = require("../config/database");
const User = db.User;

class HeaderValidator {

  validateHeaders(headers) {
    let error;
    if (!headers.language) {
      error = {
        param: "language",
        type: "required"
      };
    } else if (!headers.auth_token) {
      error = {
        param: "auth_token",
        type: "required"
      };
    }
    if (!headers.device_id) {
      error = {
        param: "device_id",
        type: "required"
      };
    }

    return error;
  }

  nonAuthValidation(req, res, next) {
    const error = module.exports.validateHeaders(req.headers);
    if (error) {
      console.log("nonAuthValidation error ==>>", error);
      response.error(req, res, error, req.headers.language, 400);
    } else if (req.headers.auth_token !== process.env.DEFALUT_AUTH_TOKEN) {
      response.error(req, res, "INVALID_TOKEN", req.headers.language, 405);
    } else {
      next();
    }
  }

  authValidation(req, res, next) {
    const error = module.exports.validateHeaders(req.headers);
    let decoded;
    if (error) {
      response.error(req, res, error, req.headers.language, 400);
    } else {
      jwt.verify(req.headers.auth_token, process.env.JWT_SECRET_KEY, (error, decoded) => {
        decoded = jwt.decode(req.headers.auth_token);

        if (error) {
          if (error.name === "TokenExpiredError" && req.skip) {
            decoded = jwt.decode(req.headers.auth_token);
            req.body.user_id = decoded.user_id;

            module.exports.isUserActive(req, res, next);
          } else {
            response.error(req, res, "TOKEN_EXPIRED", req.headers.language, 405);

          }
        } else if (decoded && decoded.user_id) {
          req.body.user_id = decoded.user_id;
          module.exports.isUserActive(req, res, next);
        } else {
          response.error(req, res, "TOKEN_MALFORMED", req.headers.language, 405);
        }
      });
    }
  }

  async isUserActive(req, res, next) {
    const userDetail = await User.findOne({
      where: { id: req.body.user_id }
    });

    if (!userDetail) { return response.error(req, res, "USER_NOT_FOUND", req.headers.language, 403); }

    next();
  }
}

module.exports = new HeaderValidator();
