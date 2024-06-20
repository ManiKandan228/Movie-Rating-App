const movieModel=require('../models/movieModel')
const initialData=require('../data/initialData')
const { response } = require('express')

const getAllMovie=async(request,response)=>
{
    try
    {
        const isMovie=await movieModel.find()
        if(isMovie.length==0)
        {
            const initialMovie=movieModel.insertMany(initialData)
            return response.status(200).send(initialMovie)
        }
        else
        {
            return response.status(200).send(isMovie)
        }
    }
    catch(error)
    {
        return response.status(500).send({message:error.message})
    }
}

const addNewMovie=async(request,response)=>
{
    const newMovie=request.body
    console.log(newMovie);
    try
    {
        const existingMovie=await movieModel.findOne({id:newMovie.id})
        if(existingMovie)
        {
            return response.status(409).json({message:`Movie ${newMovie.id} already exists`})
        }
        else
        {
            const insertedMovie=await movieModel.create(newMovie)
            return response.status(200).json(insertedMovie)
        }
    }
    catch(error)
    {
        return response.status(500).send({message:error.message})
    }
}

const updateNewMovie=async(request,response)=>
{
    const movieToBeUpdated=request.body
    try
    {
        const updatedMovie=await movieModel.updateMany({id:movieToBeUpdated.id})
        response.status(200).json(updatedMovie)
    }
    catch(error)
    {
        return response.status(500).send({message:error.message})
    }
}

const deleteMovie=async(request,response)=>
{
    const movieToBeDeleted=request.body
    try
    {
        const deletedMovie=await movieModel.deleteOne({id:movieToBeDeleted.id})
        response.status(200).json(deletedMovie)
    }
    catch(error)
    {
        return response.status(500).send({message:error.message})
    }
}
module.exports={getAllMovie,addNewMovie,updateNewMovie,deleteMovie}