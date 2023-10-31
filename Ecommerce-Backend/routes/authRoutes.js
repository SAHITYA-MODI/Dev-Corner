const express = require("express");
const {
  createUser,
  login,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getCart,
  createOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  emptyCart,
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  checkout,
  paymentVerification,
} = require("../controller/paymentController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/admin-login", loginAdmin);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
// router.put(
//   "/order/update-order/:id",
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );
router.get("/wishlist", authMiddleware, getWishlist);
router.put("/password", authMiddleware, updatePassword);
router.post("/cart", authMiddleware, userCart);
//router.post("/cart/apply-coupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/cart", authMiddleware, getCart);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getYearlyOrders", authMiddleware, getYearlyTotalOrders);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
//router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.delete("/empty", authMiddleware, emptyCart);
router.put(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);
router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.get("/getmyorders", authMiddleware, getMyOrders);
router.get("/getAllOrders", authMiddleware, isAdmin, getAllOrders);
router.get("/getAOrder/:id", authMiddleware, isAdmin, getSingleOrder);

router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrder);
//router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getOrderByUserId);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/save-address", authMiddleware, saveAddress);
router.delete("/:id", deleteUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = router;
