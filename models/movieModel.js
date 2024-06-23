const mongoose=require('mongoose')

const movieModel=new mongoose.Schema(
{
    id:
    {
        type:Number,
        required:true,
        unique:true
    },
    movie_name:
    {
        type:String,
        required:true,
    },
    year:
    {
        type:Number,
        required:true,
    },
    genre1:
    {
        type:String,
        required:true,
        enum : ["Adventure", "Action", "Science Fiction", "Animation", "Drama", "Thriller", "Mystery", "Crime","History"]
    },
    genre2:
    {
        type:String,
        required:true,
        enum : ["Adventure", "Action", "Science Fiction", "Animation", "Drama", "Thriller", "Mystery", "Crime","History"]
    },
    rating:
    {
        type:Number,
        required:true,
        min:0,
        max:10
    },
    synopsis:
    {
        type:String,
        required:true
    },
    image:
    {
        type:String,
        required:true,
    }
},
    {
        collection:'movie'
    }
)
module.exports=mongoose.model('movie',movieModel)