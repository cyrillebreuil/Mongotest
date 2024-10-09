// initialisations express
import express from "express";
export const directorsRouter = express.Router();

import { db } from "../config/db.js";

import { ObjectId } from "mongodb";

router.get('/', async(req, res) => {
  const directors = await db.collection('directors').find().toArray();
  res.status(200).json(directors);
})

router.get('/:id', async(req, res) => {
  const id = req.params.id;
  const director = await db.collection('directors').findOne( { _id: new ObjectId(id) } );
  res.status(200).json(director);
});

router.post('/', async(req, res) => {
  const { name, birthdate, nationality } = req.body;
  const result = await db.collection('directors').insertOne( { name, birthdate, nationality } );
  res.status(201).json(result);
});

router.put('/:id', async(req, res) => {
  const id = req.params.id;
  const { name, birthdate, nationality } = req.body;
  const result = db.collection('directors').updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, birthdate, nationality } }
  );
  res.status(200).json(result);
});

router.delete('/:id', async(req, res) => {
  const id = req.params.id;
  const result = db.collection('directors').deleteOne(  { _id: new ObjectId(id) } );
  res.status(200).json(result);
});