const express = require("express");
const router = express.Router();

const {
    addAddress,
    getAddresses,
    getAddressesByUserId,
    updateAddress,
    setDefaultAddress,
    deleteAddress
} = require("../controllers/addressController");

router.get("/", getAddresses);
router.get("/user/:userId", getAddressesByUserId);
router.post("/", addAddress);
router.put("/:addressId/default", setDefaultAddress);
router.put("/:addressId", updateAddress);
router.delete("/:addressId", deleteAddress);

module.exports = router;