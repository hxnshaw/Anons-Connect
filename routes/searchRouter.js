const express = require("express");
const router = express.Router();
const searchForPosts = require("../controllers/searchController");
const authenticateUser = require("../middlewares/authentication");

router.route("/").get(authenticateUser, searchForPosts);

module.exports = router;
