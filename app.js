const express = require('express');
const app = express();
require('dotenv').config();
const PORT = 3500;


const multer = require('multer');
const cors = require('cors');
const path=require('path')

const mongoose = require('mongoose');
const movieModel = require('./models/movieModel');
const movieRouter=require('./routes/movieRoute')

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/img/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await movieModel.findById(id);
    if (!movie) return res.status(404).send({ msg: "Image not found" });

    const imagePath = path.join(__dirname, "uploads", movie.image);
    res.sendFile(imagePath);
  } catch (error) {
    res.status(500).send({ error: "Unable to get image" });
  }
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/api/v1/movies', upload.single('image'), async (req, res) => {
  const image = req.file;

  if (!image) {
    return res.status(400).send('Image is required');
  }

  const movieInfo = {
    id: req.body.id,
    movie_name: req.body.movie_name,
    year: req.body.year,
    genre1: req.body.genre1,
    genre2: req.body.genre2,
    rating: req.body.rating,
    synopsis: req.body.synopsis,
    image: image.filename  // Store only the filename
  };
  
  try {
    const newMovie = new movieModel(movieInfo);
    const savedMovie = await newMovie.save();
    res.status(201).send({
      message: 'Movie added successfully',
      data: savedMovie
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

mongoose.connect(process.env.DB_URL)
const db=mongoose.connection
db.on('error',(errorMessage)=>console.log(errorMessage))
db.once('open',()=>console.log('Connected to db successfully'))

app.use('/api/v1/movies',movieRouter)

app.listen(PORT, console.log(`Server started running on http://localhost:${PORT}/api/v1/movies/`))