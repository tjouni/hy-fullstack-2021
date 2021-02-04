const jwt = require("jsonwebtoken");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  try {
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      const token = authorization.substring(7);
      const decodedToken = jwt.verify(token, process.env.SECRET);
      request.token = decodedToken;
    }
  } catch {
    request.token = null;
  }
  next();
};

module.exports = { tokenExtractor };
