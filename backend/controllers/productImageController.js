const ProductImage = require("../model/productImageModel");

/* GET ALL */
const getProductImages = (req, res) => {

    ProductImage.getProductImages((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* GET BY PRODUCT */
const getImagesByProductId = (req, res) => {

    const productId = req.params.productId;

    ProductImage.getImagesByProductId(productId, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* CREATE */
const createProductImage = (req, res) => {

    ProductImage.createProductImage(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Thêm ảnh sản phẩm thành công"
        });
    });
};

/* UPDATE */
const updateProductImage = (req, res) => {

    const id = req.params.id;

    ProductImage.updateProductImage(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Cập nhật ảnh thành công"
        });
    });
};

/* DELETE */
const deleteProductImage = (req, res) => {

    const id = req.params.id;

    ProductImage.deleteProductImage(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Xóa ảnh thành công"
        });
    });
};

module.exports = {
    getProductImages,
    getImagesByProductId,
    createProductImage,
    updateProductImage,
    deleteProductImage
};