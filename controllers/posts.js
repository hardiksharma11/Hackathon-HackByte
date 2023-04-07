const Posts = require("../models/Posts")


const getallposts = async (req, res) => {
    try {
        const posts = await Posts.find()
        const count = posts.length;
        res.status(200).json({
            count,
            posts
        })
    } catch (error) {
        console.log(error)
    }


}
const addpost = async (req, res) => {

    try {
        const { video, desc } = req.body;
        const user = req.user.userId;

        const post = await Posts.create({video, desc, user})

        res.status(200).json({
            post
        })
    } catch (error) {
        console.log(error)
    }

}

const deletepost = async (req,res) => {
    const idtodelete = req.params.id ; 

    const post = await Posts.findByIdAndDelete(idtodelete) ; 

    if(!post) res.status(404).json({"error" : "Post Not Found ! "}); 

    res.status(200).json({
        "success" : true , 
        post 
    })

}



module.exports = { getallposts, addpost, deletepost }; 