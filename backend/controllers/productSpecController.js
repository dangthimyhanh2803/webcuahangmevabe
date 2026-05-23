const ProductSpec = require("../model/productSpecModel");

/* GET ALL */
const getProductSpecs = (req, res) => {

    ProductSpec.getProductSpecs((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* GET BY ID */
const getProductSpecById = (req, res) => {

    const id = req.params.id;

    ProductSpec.getProductSpecById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};

/* GET BY PRODUCT */
const getSpecsByProductId = (req, res) => {

    const productId = req.params.productId;

    ProductSpec.getSpecsByProductId(productId, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* CREATE */
const createProductSpec = (req, res) => {

    ProductSpec.createProductSpec(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Thêm thông số sản phẩm thành công"
        });
    });
};

/* UPDATE */
const updateProductSpec = (req, res) => {

    const id = req.params.id;

    ProductSpec.updateProductSpec(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Cập nhật thông số thành công"
        });
    });
};

/* DELETE */
const deleteProductSpec = (req, res) => {

    const id = req.params.id;

    ProductSpec.deleteProductSpec(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Xóa thông số thành công"
        });
    });
};

module.exports = {
    getProductSpecs,
    getProductSpecById,
    getSpecsByProductId,
    createProductSpec,
    updateProductSpec,
    deleteProductSpec
};