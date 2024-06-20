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
    genre:
    {
        type:String,
        required:true,
        enum : ["Adventure", "Action", "Comedy", "Animation", "Drama", "Horror", "Mystery", "Crime"]
    },
    thumbnail_image:
    {
        data: Buffer,
        contentType: String
    },
    rating:
    {
        type:String,
        required:true,
    },
    synopsis:
    {
        type:String,
        required:true
    }
},
    {
        collection:'movie-details'
    }
)
module.exports=mongoose.model('movie-details',movieModel)