const express = require("express");
const { protect } = require("../middleware/auth.js");

const {
    getallposts , addpost ,  deletepost
} = require("../controllers/posts.js");


const router = express.Router();

router.route("/getallposts").get(protect,getallposts);
router.route("/addpost").post(protect,addpost);
router.route("/deletepost/:id").delete(protect,deletepost);

module.exports = router;
