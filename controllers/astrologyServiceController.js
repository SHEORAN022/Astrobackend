const AstrologyService = require("../models/AstrologyService");

/* ================= ADD SERVICE ================= */
exports.addService = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const service = await AstrologyService.create({
      title,
      description,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Astrology service added",
      data: service,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET ALL ================= */
exports.getAllServices = async (req, res) => {
  try {
    const services = await AstrologyService.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET BY ID ================= */
exports.getServiceById = async (req, res) => {
  try {
    const service = await AstrologyService.findById(req.params.id);
    if (!service)
      return res.status(404).json({ message: "Service not found" });

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateService = async (req, res) => {
  try {
    const updated = await AstrologyService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Astrology service updated",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteService = async (req, res) => {
  try {
    await AstrologyService.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Astrology service deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
