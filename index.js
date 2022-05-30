const express=require("express");
const path=require("path");
const app=express();
const cors=require("cors");
app.use(cors());
const PORT = process.env.PORT || 3000;
const Post = require("./Post")
const multer  = require('multer');
app.use("/", express.static('public'));
require("dotenv").config();
const mongoose=require("mongoose");
mongoose.connect(process.env.DB_URI, (error, result)=>{
    if(error){
        console.error(error)
    }
    else{
        console.log('Connected to mongoose');
    }
})
app.use(express.urlencoded({ extended: true }))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
  });
const upload = multer({ storage })

app.post('/upload', upload.single('image'), async function (req, res) {
    const {title, description}=req.body;   
    const post = new Post({title, description, image: req.file.path})
    console.log(post);
    post.save();
    res.send("saved");
});
app.get("/get/all", async (req, res)=>{
    const all=await Post.find({});
    return res.send(all);
})
app.get("/get/:id", async (req, res)=>{
    const post = await Post.findOne({_id: req.params.id});
    return res.send(post);
})
app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));