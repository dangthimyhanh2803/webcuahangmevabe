const Order = require("../model/orderModel");
const OrderDetail = require("../model/orderDetailModel");

/* GET ALL ORDERS */
const getOrders = (req, res) => {
    Order.getOrders((err, result) => {
        if (err) return res.status(500).json({ error: "Lỗi hệ thống", details: err });
        res.json(result);
    });
};

/* GET ORDER BY ID */
const getOrderById = (req, res) => {
    const id = req.params.id;
    Order.getOrderById(id, (err, orderResult) => {
        if (err || !orderResult || orderResult.length === 0) return res.status(404).json({ message: "Không tìm thấy" });
        OrderDetail.getDetailsByOrderId(id, (detailErr, detailsResult) => {
            // Khử trùng lặp ảnh sản phẩm nếu có
            const uniqueItems = [];
            const seen = new Set();
            if (!detailErr && detailsResult) {
                detailsResult.forEach(item => {
                    if (item.orderDetailId && !seen.has(item.orderDetailId)) {
                        seen.add(item.orderDetailId);
                        uniqueItems.push(item);
                    }
                });
            }
            res.json({ ...orderResult[0], items: uniqueItems });
        });
    });
};

/* ✅ TỐI ƯU: LẤY LỊCH SỬ ĐƠN HÀNG KÈM CHI TIẾT SẢN PHẨM KHÔNG BỊ TRÙNG LẶP */
const getOrdersByUserId = (req, res) => {
    const userId = req.params.userId;
    Order.getOrdersByUserId(userId, (err, orders) => {
        if (err) return res.status(500).json({ error: "Lỗi server" });
        if (!orders || orders.length === 0) return res.json([]);

        let completed = 0;
        const ordersWithItems = new Array(orders.length);

        orders.forEach((order, index) => {
            // Sửa từ order.id thành order.orderId để khớp chính xác với Model định nghĩa
            const currentOrderId = order.orderId || order.id;

            OrderDetail.getDetailsByOrderId(currentOrderId, (detailErr, detailsResult) => {
                // SỬA LỖI ĐẶT 1 HIỆN 4: Khử trùng lặp phần tử bằng Set (do SQL JOIN nhiều ảnh sản phẩm)
                const uniqueItems = [];
                const seen = new Set();

                if (!detailErr && detailsResult) {
                    detailsResult.forEach(item => {
                        if (item.orderDetailId && !seen.has(item.orderDetailId)) {
                            seen.add(item.orderDetailId);
                            uniqueItems.push(item);
                        } else if (!item.orderDetailId) {
                            // Trường hợp fallback nếu DB không có orderDetailId
                            const fallbackKey = `${item.productId}_${item.size}`;
                            if (!seen.has(fallbackKey)) {
                                seen.add(fallbackKey);
                                uniqueItems.push(item);
                            }
                        }
                    });
                }

                ordersWithItems[index] = {
                    ...order,
                    orderId: currentOrderId,
                    items: uniqueItems
                };
                completed++;

                // Khi duyệt xong toàn bộ đơn hàng thì phản hồi về cho Frontend
                if (completed === orders.length) {
                    res.json(ordersWithItems);
                }
            });
        });
    });
};

/* TẠO ĐƠN HÀNG ĐỒNG THỜI LƯU LUÔN SẢN PHẨM VÀO ORDERDETAILS */
const createOrder = (req, res) => {
    const { userId, addressId, totalAmount, discountId, discountAmount, finalAmount, paymentMethod, status, items } = req.body;

    const orderData = {
        userId: userId || 1,
        addressId: addressId || null,
        totalAmount: totalAmount || 0,
        discountId: discountId || null,
        discountAmount: discountAmount || 0,
        finalAmount: finalAmount || totalAmount,
        paymentMethod: paymentMethod || "cod",
        status: status || "pending"
    };

    Order.createOrder(orderData, (err, result) => {
        if (err) return res.status(500).json({ error: "Lỗi tạo đơn" });
        const newOrderId = result.insertId || result.id;

        if (!items || items.length === 0) {
            return res.status(201).json({ message: "Tạo đơn hàng thành công (không có sản phẩm)!", orderId: newOrderId });
        }

        let insertedCount = 0;
        let hasError = false;

        items.forEach((item) => {
            const detailData = {
                orderId: newOrderId,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                size: item.size || "M"
            };

            OrderDetail.createOrderDetail(detailData, (detailErr) => {
                if (detailErr && !hasError) {
                    hasError = true;
                    return res.status(500).json({ error: "Lỗi khi lưu sản phẩm vào đơn hàng", details: detailErr });
                }

                insertedCount++;
                if (insertedCount === items.length && !hasError) {
                    res.status(201).json({ message: "Tạo đơn hàng và lưu chi tiết thành công!", orderId: newOrderId });
                }
            });
        });
    });
};

/* UPDATE ORDER STATUS */
const updateOrder = (req, res) => {
    Order.updateOrder(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Cập nhật thành công" });
    });
};

/* DELETE ORDER */
const deleteOrder = (req, res) => {
    Order.deleteOrder(req.params.id, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Xóa thành công" });
    });
};

/* HUỶ ĐƠN HÀNG */
const cancelOrder = (req, res) => {
    const id = req.params.id;
    Order.getOrderById(id, (err, result) => {
        if (err || !result || result.length === 0) return res.status(404).json({ message: "Không tìm thấy" });
        const order = result[0];

        const paymentMethodLower = (order.paymentMethod || "").toLowerCase();
        const statusLower = (order.status || "").toLowerCase();

        if (paymentMethodLower !== "cod" || statusLower !== "pending") {
            return res.status(400).json({ message: "Chỉ được huỷ đơn COD và đang chờ xử lý" });
        }

        Order.updateOrder(id, { ...order, status: "cancelled" }, (updateErr) => {
            if (updateErr) return res.status(500).json({ error: "Lỗi khi huỷ đơn hàng" });
            res.json({ message: "Huỷ đơn hàng thành công" });
        });
    });
};

module.exports = {
    getOrders,
    getOrderById,
    getOrdersByUserId,
    createOrder,
    updateOrder,
    deleteOrder,
    cancelOrder
};