const ProductDiscount = require("../model/productDiscountModel");

/* GET ALL */
const getProductDiscounts = (req, res) => {

    ProductDiscount.getProductDiscounts((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* GET BY ID */
const getProductDiscountById = (req, res) => {

    const id = req.params.id;

    ProductDiscount.getProductDiscountById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};

/* GET BY PRODUCT */
const getDiscountsByProductId = (req, res) => {

    const productId = req.params.productId;

    ProductDiscount.getDiscountsByProductId(productId, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* CREATE */
const createProductDiscount = (req, res) => {

    ProductDiscount.createProductDiscount(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Thêm giảm giá cho sản phẩm thành công"
        });
    });
};

/* UPDATE */
const updateProductDiscount = (req, res) => {

    const id = req.params.id;

    ProductDiscount.updateProductDiscount(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Cập nhật giảm giá thành công"
        });
    });
};

/* DELETE */
const deleteProductDiscount = (req, res) => {

    const id = req.params.id;

    ProductDiscount.deleteProductDiscount(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Xóa giảm giá thành công"
        });
    });
};

module.exports = {
    getProductDiscounts,
    getProductDiscountById,
    getDiscountsByProductId,
    createProductDiscount,
    updateProductDiscount,
    deleteProductDiscount
};