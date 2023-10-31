const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_JgCQH3xoebN5rQ",
  key_secret: "LSouEdZB7aYJtpWkudd79PY9",
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.json({ success: true, order });
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({ razorpayOrderId, razorpayPaymentId });
};

module.exports = { checkout, paymentVerification };
