const express = require('express');
const cors = require('cors');

const app = express();

/* DATABASE */
const db = require('./config/db');
const addressRoutes = require("./routes/addressRoutes");
const accountRoutes = require("./routes/accountRoutes");
const otpCodeRoutes = require("./routes/otpCodeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const productImageRoutes = require("./routes/productImageRoutes");
const discountRoutes = require("./routes/discountRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderDetailRoutes = require("./routes/orderDetailRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const productSpecRoutes = require("./routes/productSpecRoutes");
const productDiscountRoutes = require("./routes/productDiscountRoutes");
const productStockRoutes = require("./routes/productStockRoutes");
const vnpayRoutes = require("./routes/vnpayRoutes");
/* MIDDLEWARE */
app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* ROUTES */
app.use("/api/address", addressRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/otp", otpCodeRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/product-image", productImageRoutes);
app.use("/api/discount", discountRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-detail", orderDetailRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/product-spec", productSpecRoutes);
app.use("/api/product-stock", productStockRoutes);
app.use("/api/vnpay", vnpayRoutes);
app.use("/image", express.static("public/image"));
/* TEST */
app.get('/', (req, res) => {
    res.send('API running');
});

/* SERVER */
app.listen(5000, () => {
    console.log('Server running on port 5000');
});