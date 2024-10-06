import express from 'express'
import movie from '../models/movies.js';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken'
import movies from '../models/movies.js';
import mongoose from 'mongoose';
const movieRouter = express.Router();

//add movies 
movieRouter.post("/",async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" });
  }

  let adminId;

  // verify token
  jwt.verify(extractedToken,'MY-SECRET-KEY', (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new movie
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() == "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = new movies({
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      admin: adminId,
      posterUrl,
      title,
    });
    const adminUser = await Admin.findById(adminId);
    await movie.save();
    adminUser.addedMovies.push(movie);
    await adminUser.save();
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ movie });
});

//get all movie
movieRouter.get("/", async (req, res, next) => {
  let movies;

  try {
    movies = await movie.find();
  } catch (err) {
    return console.log(err);
  }

  if (!movies) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ movies });
});

//get movie by id
movieRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await movies.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie ID" });
  }

  return res.status(200).json({ movie });
});

export default movieRouter;