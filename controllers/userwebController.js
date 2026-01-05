// const UserWeb = require("../models/userwebUser");

// // get profile
// exports.getProfile = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id).select("-otp -otpExpiry -password");
//     if (!u) return res.status(404).json({ success: false, message: "Not found" });
//     res.json({ success: true, data: u });
//   } catch (err) { res.status(500).json({ success: false, error: err.message }); }
// };

// // update profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const updated = await UserWeb.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json({ success: true, data: updated });
//   } catch (err) { res.status(500).json({ success: false, error: err.message }); }
// };

// // orders
// exports.getOrders = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     res.json({ success: true, data: (u && u.orders) || [] });
//   } catch (err) { res.status(500).json({ success: false, error: err.message }); }
// };

// // payments
// exports.getPayments = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     res.json({ success: true, data: (u && u.payments) || [] });
//   } catch (err) { res.status(500).json({ success: false, error: err.message }); }
// };

// // remedies
// exports.getRemedies = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     res.json({ success: true, data: (u && u.remedies) || [] });
//   } catch (err) { res.status(500).json({ success: false, error: err.message }); }
// };

// // kundli
// exports.getKundli = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     res.json({ success: true, data: (u && u.kundli) || {} });
//   } catch (err) { res.status(500).json({ success: false, error: err.message }); }
// };

// // wallet
// exports.getWallet = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     res.json({ success: true, data: (u && u.wallet) || {} });
//   } catch (err) { res.status(500).json({ success: false, error: err.message }); }
// };

// // full history
// exports.getFullHistory = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     if (!u) return res.status(404).json({ success: false, message: "Not found" });
//     res.json({
//       success: true,
//       data: {
//         profile: { name: u.name, email: u.email, phone: u.phone, dob: u.dob, location: u.location },
//         kundli: u.kundli, orders: u.orders, payments: u.payments, remedies: u.remedies, wallet: u.wallet
//       }
//     });
//   } catch (err) { res.status(500).json({ success: false, error: err.message }); }
// };
// const UserWeb = require("../models/userwebUser");

// // ===============================
// // GET PROFILE
// // ===============================
// exports.getProfile = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id).select("-otp -otpExpiry -password");
//     if (!u)
//       return res.status(404).json({ success: false, message: "Not found" });

//     res.json({ success: true, data: u });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ===============================
// // UPDATE PROFILE (SECURE)
// // ===============================
// exports.updateProfile = async (req, res) => {
//   try {
//     // Only these fields user can change
//     const allowed = [
//       "name",
//       "phone",
//       "gender",
//       "dob",
//       "timeOfBirth",
//       "placeOfBirth",
//       "location",
//       "profileImage",
//     ];

//     const updates = {};
//     allowed.forEach((key) => {
//       if (req.body[key] !== undefined) updates[key] = req.body[key];
//     });

//     const updated = await UserWeb.findByIdAndUpdate(
//       req.params.id,
//       { $set: updates },
//       { new: true }
//     );

//     res.json({ success: true, data: updated });

//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ===============================
// // ORDERS HISTORY
// // ===============================
// exports.getOrders = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     res.json({ success: true, data: (u && u.orders) || [] });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ===============================
// // PAYMENTS HISTORY
// // ===============================
// exports.getPayments = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     res.json({ success: true, data: (u && u.payments) || [] });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ===============================
// // REMEDIES HISTORY
// // ===============================
// exports.getRemedies = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     res.json({ success: true, data: (u && u.remedies) || [] });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ===============================
// // KUNDLI DETAILS
// // ===============================
// exports.getKundli = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     res.json({ success: true, data: (u && u.kundli) || {} });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ===============================
// // WALLET
// // ===============================
// exports.getWallet = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     res.json({ success: true, data: (u && u.wallet) || {} });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ===============================
// // FULL USER HISTORY (ALL DETAILS)
// // ===============================
// exports.getFullHistory = async (req, res) => {
//   try {
//     const u = await UserWeb.findById(req.params.id);
//     if (!u) return res.status(404).json({ success: false, message: "Not found" });

//     res.json({
//       success: true,
//       data: {
//         profile: {
//           name: u.name,
//           email: u.email,
//           phone: u.phone,
//           dob: u.dob,
//           location: u.location,
//         },
//         kundli: u.kundli,
//         orders: u.orders,
//         payments: u.payments,
//         remedies: u.remedies,
//         wallet: u.wallet,
//       },
//     });

//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };




































const UserWeb = require("../models/userwebUser");

// ===============================
// GET PROFILE
// ===============================
exports.getProfile = async (req, res) => {
  try {
    const u = await UserWeb.findById(req.params.id).select("-otp -otpExpiry -password");
    if (!u)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: u });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// UPDATE PROFILE (SECURE)
// ===============================
exports.updateProfile = async (req, res) => {
  try {
    // Only these fields user can change
    const allowed = [
      "name",
      "phone",
      "gender",
      "dob",
      "timeOfBirth",
      "placeOfBirth",
      "location",
      "profileImage",
    ];

    const updates = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const updated = await UserWeb.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    res.json({ success: true, data: updated });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// ADD RELATIONSHIP
// ===============================
exports.addRelationship = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, relationship } = req.body;
    
    if (!["children", "parents", "partners"].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid relationship type" });
    }

    const user = await UserWeb.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Add relationship to the specified array
    user[type].push(relationship);
    await user.save();

    res.json({ 
      success: true, 
      message: "Relationship added successfully",
      data: user[type]
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// REMOVE RELATIONSHIP
// ===============================
exports.removeRelationship = async (req, res) => {
  try {
    const { id, type, index } = req.params;
    
    if (!["children", "parents", "partners"].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid relationship type" });
    }

    const user = await UserWeb.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Remove relationship by index
    if (index >= 0 && index < user[type].length) {
      user[type].splice(index, 1);
      await user.save();
    }

    res.json({ 
      success: true, 
      message: "Relationship removed successfully",
      data: user[type]
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// GET CALENDAR EVENTS
// ===============================
exports.getCalendarEvents = async (req, res) => {
  try {
    const u = await UserWeb.findById(req.params.id);
    
    if (!u) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ 
      success: true, 
      events: u.calendarEvents || [],
      data: u.calendarEvents || []
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// ADD CALENDAR EVENT
// ===============================
exports.addCalendarEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const eventData = req.body;

    const user = await UserWeb.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.calendarEvents.push(eventData);
    await user.save();

    res.json({ 
      success: true, 
      message: "Event added successfully",
      data: user.calendarEvents
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// ORDERS HISTORY
// ===============================
exports.getOrders = async (req, res) => {
  try {
    const u = await UserWeb.findById(req.params.id);
    res.json({ success: true, data: (u && u.orders) || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// PAYMENTS HISTORY
// ===============================
exports.getPayments = async (req, res) => {
  try {
    const u = await UserWeb.findById(req.params.id);
    res.json({ success: true, data: (u && u.payments) || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// REMEDIES HISTORY
// ===============================
exports.getRemedies = async (req, res) => {
  try {
    const u = await UserWeb.findById(req.params.id);
    res.json({ success: true, data: (u && u.remedies) || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// KUNDLI DETAILS
// ===============================
exports.getKundli = async (req, res) => {
  try {
    const u = await UserWeb.findById(req.params.id);
    res.json({ success: true, data: (u && u.kundli) || {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// WALLET
// ===============================
exports.getWallet = async (req, res) => {
  try {
    const u = await UserWeb.findById(req.params.id);
    res.json({ success: true, data: (u && u.wallet) || {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// FULL USER HISTORY (ALL DETAILS)
// ===============================
exports.getFullHistory = async (req, res) => {
  try {
    const u = await UserWeb.findById(req.params.id);
    if (!u) return res.status(404).json({ success: false, message: "Not found" });

    res.json({
      success: true,
      data: {
        profile: {
          name: u.name,
          email: u.email,
          phone: u.phone,
          dob: u.dob,
          location: u.location,
          gender: u.gender,
          profileImage: u.profileImage
        },
        relationships: {
          children: u.children,
          parents: u.parents,
          partners: u.partners
        },
        calendarEvents: u.calendarEvents,
        kundli: u.kundli,
        orders: u.orders,
        payments: u.payments,
        remedies: u.remedies,
        wallet: u.wallet,
      },
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
