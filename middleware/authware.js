const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.user = decodedToken; // Add user information to the request object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Authentication failed" });
  }
}

module.exports = { authMiddleware };
