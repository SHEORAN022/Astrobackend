
// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User");

// // module.exports = async (req, res, next) => {
// //   try {
// //     // 1️⃣ Check if Authorization header exists
// //     const authHeader = req.headers.authorization;
// //     if (!authHeader || !authHeader.startsWith("Bearer "))
// //       return res.status(401).json({ message: "No token provided" });

// //     // 2️⃣ Extract token
// //     const token = authHeader.split(" ")[1];

// //     // 3️⃣ Verify token
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     if (!decoded || !decoded.id)
// //       return res.status(401).json({ message: "Token is invalid" });

// //     // 4️⃣ Fetch user from DB
// //     const user = await User.findById(decoded.id).select("-password"); // Exclude password
// //     if (!user) return res.status(401).json({ message: "User not found" });

// //     // 5️⃣ Check if user is admin
// //     if (!user.isAdmin) return res.status(403).json({ message: "Admin access required" });

// //     // 6️⃣ Attach user to request
// //     req.user = user;
// //     next();
// //   } catch (err) {
// //     console.error("Admin auth middleware error:", err.message);
// //     res.status(401).json({ message: "Invalid or expired token" });
// //   }
// // };


// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };



const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserWeb = require("../models/userwebUser");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 1️⃣ Website user check FIRST
    let user = await UserWeb.findById(decoded.id).select("-password");

    // 2️⃣ Admin user fallback
    if (!user) {
      user = await User.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔑 IMPORTANT: req.user me sirf id + role rakho
    req.user = {
      id: user._id,
      role: user.role || "userweb", // admin / member / userweb
      email: user.email,
    };

    next();
  } catch (err) {
    console.error("❌ Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
