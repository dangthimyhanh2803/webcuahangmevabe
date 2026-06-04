const ProductStock = require("../model/productStockModel");

const getStockByProductId = (req, res) => {
    const productId = req.params.productId;
    ProductStock.getStockByProductId(productId, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0] || { quantity: 0 });
    });
};

const getAllStock = (req, res) => {
    ProductStock.getAllStock((err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

const createStock = (req, res) => {
    ProductStock.createStock(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Thêm tồn kho thành công" });
    });
};

const updateStock = (req, res) => {
    const id = req.params.id;
    ProductStock.updateStock(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Cập nhật tồn kho thành công" });
    });
};

const deleteStock = (req, res) => {
    const id = req.params.id;
    ProductStock.deleteStock(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Xóa tồn kho thành công" });
    });
};

module.exports = {
    getStockByProductId,
    getAllStock,
    createStock,
    updateStock,
    deleteStock
};