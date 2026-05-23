const OrderDetail = require("../model/orderDetailModel");

/* GET ALL */
const getOrderDetails = (req, res) => {

    OrderDetail.getOrderDetails((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* GET BY ID */
const getOrderDetailById = (req, res) => {

    const id = req.params.id;

    OrderDetail.getOrderDetailById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};

/* GET BY ORDER */
const getDetailsByOrderId = (req, res) => {

    const orderId = req.params.orderId;

    OrderDetail.getDetailsByOrderId(orderId, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* CREATE */
const createOrderDetail = (req, res) => {

    OrderDetail.createOrderDetail(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Thêm chi tiết đơn hàng thành công"
        });
    });
};

/* UPDATE */
const updateOrderDetail = (req, res) => {

    const id = req.params.id;

    OrderDetail.updateOrderDetail(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Cập nhật chi tiết đơn hàng thành công"
        });
    });
};

/* DELETE */
const deleteOrderDetail = (req, res) => {

    const id = req.params.id;

    OrderDetail.deleteOrderDetail(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Xóa chi tiết đơn hàng thành công"
        });
    });
};

module.exports = {
    getOrderDetails,
    getOrderDetailById,
    getDetailsByOrderId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
};