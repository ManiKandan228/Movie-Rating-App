const express=require('express')
const router=express.Router()
const {getAllMovie,addNewMovie,updateNewMovie,deleteMovie}=require('../controllers/movieController')
const{validateMovie}=require('../controllers/validateController')

router.route('/').get(getAllMovie).post(addNewMovie).patch(updateNewMovie).delete(deleteMovie)
router.route('/validate').post(validateMovie)

module.exports=router