const Order = require("../model/orderModel");

/* GET ALL */
const getOrders = (req, res) => {

    Order.getOrders((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* GET BY ID */
const getOrderById = (req, res) => {

    const id = req.params.id;

    Order.getOrderById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};

/* CREATE */
const createOrder = (req, res) => {

    Order.createOrder(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Tạo đơn hàng thành công"
        });
    });
};

/* UPDATE */
const updateOrder = (req, res) => {

    const id = req.params.id;

    Order.updateOrder(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Cập nhật đơn hàng thành công"
        });
    });
};

/* DELETE */
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
    createOrder,
    updateOrder,
    deleteOrder
};