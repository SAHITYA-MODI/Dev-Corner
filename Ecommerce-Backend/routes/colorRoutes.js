const express = require("express");
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getAllColor,
} = require("../controller/colorController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createColor);
router.post("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getAllColor);

module.exports = router;
