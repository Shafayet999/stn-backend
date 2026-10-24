const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    // ফিক্স: ভেরিফিকেশন ফেইল করলে next() না ডেকে 401 রিটার্ন করতে হবে
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;