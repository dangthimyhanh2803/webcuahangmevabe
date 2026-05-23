const express = require("express");

const router = express.Router();

const {
    getDiscounts,
    getDiscountById,
    createDiscount,
    updateDiscount,
    deleteDiscount
} = require("../controllers/discountController");

/* GET ALL */
router.get("/", getDiscounts);

/* GET BY ID */
router.get("/:id", getDiscountById);

/* CREATE */
router.post("/", createDiscount);

/* UPDATE */
router.put("/:id", updateDiscount);

/* DELETE */
router.delete("/:id", deleteDiscount);

module.exports = router;