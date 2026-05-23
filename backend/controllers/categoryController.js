const Category = require("../model/categoryModel");

/* GET ALL */
const getCategories = (req, res) => {

    Category.getCategories((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

/* GET BY ID */
const getCategoryById = (req, res) => {

    const id = req.params.id;

    Category.getCategoryById(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result[0]);
    });
};

/* CREATE */
const createCategory = (req, res) => {

    Category.createCategory(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Thêm category thành công"
        });
    });
};

/* UPDATE */
const updateCategory = (req, res) => {

    const id = req.params.id;

    Category.updateCategory(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Cập nhật category thành công"
        });
    });
};

/* DELETE */
const deleteCategory = (req, res) => {

    const id = req.params.id;

    Category.deleteCategory(id, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Xóa category thành công"
        });
    });
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};