const Discount = require("../model/discountModel");

/* GET ALL */
const getDiscounts = (req, res) => {

    Discount.getDiscounts((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* GET BY ID */
const getDiscountById = (req, res) => {

    const id = req.params.id;

    Discount.getDiscountById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};

/* CREATE */
const createDiscount = (req, res) => {

    Discount.createDiscount(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Thêm mã giảm giá thành công"
        });
    });
};

/* UPDATE */
const updateDiscount = (req, res) => {

    const id = req.params.id;

    Discount.updateDiscount(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Cập nhật mã giảm giá thành công"
        });
    });
};

/* DELETE */
const deleteDiscount = (req, res) => {

    const id = req.params.id;

    Discount.deleteDiscount(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Xóa mã giảm giá thành công"
        });
    });
};

module.exports = {
    getDiscounts,
    getDiscountById,
    createDiscount,
    updateDiscount,
    deleteDiscount
};