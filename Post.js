const mongoose=require("mongoose");
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
const Model = mongoose.model('Post', schema, 'blog');
module.exports=Model;