const MovieModel = require('../models/movieModel')

const validateMovie = async(request,response) =>
{
    const IDToBeValidated = request.body.id
    try
    {
        const validId = await MovieModel.findOne({id : IDToBeValidated})
        if(validId)
        {
            return response.status(200).json(validId)
        }
        else
        {
            response.status(409).send({message: `Invalid Id Number`})
        }
    }
    catch(error)
    {
        return response.status(500).send({message:error.message})
    }
}

module.exports = {validateMovie}