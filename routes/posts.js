const express = require("express");

const {
    getallnotes , addnote , updatenote , deletenote
} = require("../controllers/posts.js");

const router = express.Router();

router.route("/getallnotes").get(getallnotes);
router.route("/addnote").post(addnote);
router.route("/updatenote/:id").put(updatenote);
router.route("/deletenote/:id").delete(deletenote);

module.exports = router;
