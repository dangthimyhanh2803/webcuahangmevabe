const Product = require("../model/productModel");

/* GET ALL */
const getProducts = (req, res) => {

    const categoryId = req.query.categoryId || null;

    Product.getProducts(categoryId, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* GET BY ID */
const getProductById = (req, res) => {

    const id = req.params.id;

    Product.getProductById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};

/* CREATE */
const createProduct = (req, res) => {

    Product.createProduct(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Thêm sản phẩm thành công"
        });
    });
};

/* UPDATE */
const updateProduct = (req, res) => {

    const id = req.params.id;

    Product.updateProduct(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Cập nhật sản phẩm thành công"
        });
    });
};

/* DELETE */
const deleteProduct = (req, res) => {

    const id = req.params.id;

    Product.deleteProduct(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Xóa sản phẩm thành công"
        });
    });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};