import express from "express";
export const moviesRouter = express.Router();

import { db } from "../config/db.js";

import { ObjectId } from "mongodb";

router.get('/', async(req, res) => {
  const movies = await db.collection('movies').find().toArray();
  res.status(200).json(movies);
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const movie = await db.collection('movies')
	.findOne({_id : new ObjectId(id)});

	res.status(200).json(movie)
});

router.post('/', async(req,res) => {
	const {title, year, genre, director_id} = req.body;
	const result = await db.collection("movies")
	.insertOne({title, year, genre, director_id : new ObjectId(director_id)});

	res.status(201).json(result);
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const {title, year, genre, director_id} = req.body;
	const result = db.collection('movies')
	.updateOne(
		{_id: new ObjectId(id)},
		{$set: {title, year, genre, director_id: new ObjectId(director_id)}}
	);
	res.status(200).json(result);
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const result = db.collection('movies').deleteOne(
		{_id: new ObjectId(id)}
	);
	res.status(200).json(result);
});