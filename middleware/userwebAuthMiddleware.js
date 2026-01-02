// // // const jwt = require("jsonwebtoken");
// // // const UserWeb = require("../models/userwebUser");

// // // module.exports = async (req, res, next) => {
// // //   try {
// // //     // Check Authorization Header
// // //     const token = req.headers.authorization?.split(" ")[1];
// // //     if (!token) {
// // //       return res.status(401).json({
// // //         success: false,
// // //         message: "No token provided",
// // //       });
// // //     }

// // //     // Verify Token
// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     if (!decoded?.id) {
// // //       return res.status(401).json({
// // //         success: false,
// // //         message: "Invalid token format",
// // //       });
// // //     }

// // //     // Find user in UserWeb collection
// // //     const user = await UserWeb.findById(decoded.id).select(
// // //       "-otp -otpExpiry -password"
// // //     );

// // //     if (!user) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "User not found",
// // //       });
// // //     }

// // //     // Pass user forward
// // //     req.user = user;

// // //     next();

// // //   } catch (err) {
// // //     console.error("Auth Middleware Error:", err);
// // //     res.status(401).json({
// // //       success: false,
// // //       message: "Invalid or expired token",
// // //     });
// // //   }
// // // };

// // const jwt = require("jsonwebtoken");
// // const UserWeb = require("../models/userwebUser");

// // module.exports = async (req, res, next) => {
// //   try {
// //     const token = req.headers.authorization?.split(" ")[1];
// //     if (!token)
// //       return res.status(401).json({ success: false, message: "No token provided" });

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const user = await UserWeb.findById(decoded.id).select("-otp -otpExpiry -password");

// //     if (!user)
// //       return res.status(404).json({ success: false, message: "User not found" });

// //     req.user = user;
// //     next();
// //   } catch (err) {
// //     res.status(401).json({ success: false, message: "Invalid or expired token" });
// //   }
// // };


// const jwt = require("jsonwebtoken");
// const UserWeb = require("../models/userwebUser");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) return res.status(401).json({ success: false, message: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await UserWeb.findById(decoded.id).select("-password");
//     req.user = user;

//     next();
//   } catch {
//     res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

const jwt = require("jsonwebtoken");
const UserWeb = require("../models/userwebUser");

module.exports = async (req, res, next) => {
  try {
    // 🔑 Get token
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 Fetch user
    const user = await UserWeb.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or token invalid",
      });
    }

    // ✅ Attach user
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

