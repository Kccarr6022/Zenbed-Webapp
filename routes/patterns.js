const express = require("express");
const router = express.Router();
const { getPatterns, queryPattern } = require("../controllers/patterns");

router.route('/').get(queryPattern)


module.exports = router;