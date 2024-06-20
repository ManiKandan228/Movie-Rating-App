const express=require('express')
const router=express.Router()
const {getAllMovie,addNewMovie,updateNewMovie,deleteMovie}=require('../controllers/movieController')

router.route('/').get(getAllMovie).post(addNewMovie).patch(updateNewMovie).delete(deleteMovie)

module.exports=router