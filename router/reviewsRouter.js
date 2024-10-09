import express from "express";
export const reviewsRouter = express.Router();

import { db } from "../config/db.js";

import { ObjectId } from "mongodb";

router.get('/', async (req, res) => {
	const reviews = await db.collection('reviews')
	.find()
	.toArray();

	res.status(200).json(reviews);
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const review = await db.collection('reviews')
	.findone({_id : new ObjectId(id)});

	res.status(200).json(review);
});

router.post('/', async (req, res) => {
	const {movie_id, reviewer_name, rating, comment} = req.body;
	const result = await db.collection('reviews')
	.insertOne({movie_id: new ObjectId(movie_id), reviewer_name, rating, comment});

	res.status(201).json(result);
});

router.put('/:id', async (req,res) => {
	const id = req.params.id;
	const {movie_id, reviewer_name, rating, comment} = req.body;
	const result = db.collection('reviews')
	.updateOne(
		{_id: new ObjectId(id)},
		{$set: {movie_id : new ObjectId(movie_id), reviewer_name, rating, comment}}
	);

	res.status(200).json(result);
});

router.delete('/:id', async(req,res) => {
	const id = req.params.id;
	const result = db.collection('reviews')
	.deleteOne({_id: new ObjectId(id)});

	res.status(200).json(result);
})