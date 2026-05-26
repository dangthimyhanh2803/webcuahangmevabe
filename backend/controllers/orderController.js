const Order = require("../model/orderModel");
const OrderDetail = require("../model/orderDetailModel"); // Import thêm model chi tiết để xử lý đồng bộ

/* GET ALL ORDERS */
const getOrders = (req, res) => {
    Order.getOrders((err, result) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi hệ thống khi lấy danh sách đơn hàng", details: err });
        }
        res.json(result);
    });
};

/* GET ORDER BY ID (Xem chi tiết 1 đơn hàng cụ thể) */
const getOrderById = (req, res) => {
    const id = req.params.id;

    Order.getOrderById(id, (err, orderResult) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi hệ thống", details: err });
        }
        if (!orderResult || orderResult.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }

        // Lấy tiếp các sản phẩm thuộc đơn hàng này
        OrderDetail.getDetailsByOrderId(id, (detailErr, detailsResult) => {
            if (detailErr) {
                return res.status(500).json({ error: "Lỗi lấy chi tiết sản phẩm", details: detailErr });
            }
            // Trả về object đơn hàng gộp kèm mảng mặt hàng items
            res.json({
                ...orderResult[0],
                items: detailsResult
            });
        });
    });
};

/* GET ORDERS BY USER ID (Lấy lịch sử mua hàng của 1 Khách hàng cụ thể) */
const getOrdersByUserId = (req, res) => {
    const userId = req.params.userId || req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: "Thiếu userId của khách hàng" });
    }

    Order.getOrders((err, allOrders) => {
        if (err) return res.status(500).json(err);

        // Lọc các đơn hàng của user này
        const userOrders = allOrders.filter(o => o.userId == userId);

        if (userOrders.length === 0) {
            return res.json([]);
        }

        // Tiến hành lấy danh sách các mặt hàng gắn liền với các đơn hàng này
        OrderDetail.getOrderDetails((detErr, allDetails) => {
            if (detErr) return res.status(500).json(detErr);

            // Gộp danh sách sản phẩm vào từng đơn hàng tương ứng
            const completedData = userOrders.map(order => {
                const items = allDetails.filter(d => d.orderId === order.orderId);
                return { ...order, items };
            });

            res.json(completedData);
        });
    });
};

/* CREATE ORDER (Tạo đơn hàng hoàn chỉnh bao gồm cả sản phẩm bên trong) */
const createOrder = (req, res) => {
    const {
        userId,
        address,
        addressId,
        totalPrice,
        totalAmount,
        discountId,
        discountAmount,
        finalAmount,
        paymentMethod,
        status,
        items
    } = req.body;

    // Chuẩn hóa dữ liệu tiền tệ
    const actualTotal = totalPrice || finalAmount || totalAmount || 0;

    // Chuẩn hóa địa chỉ phù hợp khóa ngoại hoặc chuỗi text
    const actualAddress = addressId || address || "Địa chỉ mặc định";

    // 💡 XỬ LÝ LỖI TRUNCATED: Đồng bộ hóa giá trị trạng thái (status)
    // Nếu phía Frontend gửi lên chữ viết thường hoặc trống, gán mặc định chuỗi tiếng Anh chuẩn ENUM phổ biến là 'Pending'.
    let actualStatus = status || "Pending";

    // Đề phòng nếu Frontend gửi lên chữ Tiếng Việt có dấu, ta chuyển đổi tự động sang chữ không dấu/mã hóa chuẩn hệ thống
    if (actualStatus === "Chờ thanh toán") {
        actualStatus = "Pending";
    }

    const orderData = {
        userId: userId || 1,
        address: actualAddress,
        addressId: addressId || null,
        totalAmount: actualTotal,
        discountId: discountId || null,
        discountAmount: discountAmount || 0,
        finalAmount: actualTotal,
        paymentMethod: paymentMethod || "COD",
        status: actualStatus // Đã được xử lý tránh lỗi ép kiểu ký tự (Truncated)
    };

    // 1. Tạo bản ghi chính trong bảng orders
    Order.createOrder(orderData, (err, result) => {
        if (err) {
            console.error("❌ Lỗi tại Order.createOrder Database:", err);
            return res.status(500).json({ error: "Không thể tạo hóa đơn tổng", details: err.message || err });
        }

        // Lấy insertId từ kết quả trả về của MySQL
        const newOrderId = result ? (result.insertId || result.id) : null;

        if (!newOrderId) {
            return res.status(500).json({ error: "Hệ thống không trả về Order ID mới sau khi insert." });
        }

        if (!items || items.length === 0) {
            return res.status(201).json({ message: "Tạo đơn hàng trống thành công", orderId: newOrderId });
        }

        // 2. Vòng lặp thêm từng sản phẩm vào bảng orderdetails
        let completedCount = 0;
        let hasError = false;

        items.forEach((item) => {
            const detailData = {
                orderId: newOrderId,
                productId: item.productId || item.id,
                quantity: item.quantity || 1,
                price: item.price || 0,
                size: item.size || "M"
            };

            OrderDetail.createOrderDetail(detailData, (detailErr) => {
                if (detailErr && !hasError) {
                    hasError = true;
                    console.error("❌ Lỗi tại OrderDetail.createOrderDetail Database:", detailErr);
                    return res.status(500).json({ error: "Lỗi khi lưu chi tiết mặt hàng vào database", details: detailErr.message || detailErr });
                }

                completedCount++;
                // Khi toàn bộ danh sách mặt hàng đã được lưu thành công
                if (completedCount === items.length && !hasError) {
                    res.status(201).json({
                        message: "Đặt hàng thành công!",
                        orderId: newOrderId
                    });
                }
            });
        });
    });
};

/* UPDATE ORDER STATUS */
const updateOrder = (req, res) => {
    const id = req.params.id;

    Order.updateOrder(id, req.body, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({
            message: "Cập nhật trạng thái đơn hàng thành công"
        });
    });
};

/* DELETE ORDER */
const deleteOrder = (req, res) => {
    const id = req.params.id;

    Order.deleteOrder(id, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({
            message: "Xóa đơn hàng thành công"
        });
    });
};

module.exports = {
    getOrders,
    getOrderById,
    getOrdersByUserId,
    createOrder,
    updateOrder,
    deleteOrder
};