const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controller/blogCategoryController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.post("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getCategory);

module.exports = router;
