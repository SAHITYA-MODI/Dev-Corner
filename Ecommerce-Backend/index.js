const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const productRouter = require("./routes/productRoutes");
const blogRouter = require("./routes/blogRoutes");
const categoryRouter = require("./routes/prodcategoryRoutes");
const blogCategoryRouter = require("./routes/blogCategoryRoutes");
const brandRouter = require("./routes/brandRoutes");
const colorRouter = require("./routes/colorRoutes");
const couponRouter = require("./routes/couponRoutes");
const enquiryRouter = require("./routes/enquiryRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const { createCoupon } = require("./controller/couponController");
const PORT = process.env.PORT || 4000;

dbConnect();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogCategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/color", colorRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/enquiry", enquiryRouter);
app.use("/api/upload", uploadRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
