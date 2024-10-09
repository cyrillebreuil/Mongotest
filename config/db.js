import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URL);

client.connect();

export const db = client.db("mongoflix")