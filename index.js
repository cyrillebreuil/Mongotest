import "dotenv/config";
import express from express;
import db from "./config/db.js";
import {directorsRouter} from "./router/directorsRoute.js";
import {moviesRouter} from "./router/moviesRouter.js";
import { reviewsRouter } from "./router/reviewsRouter.js";

const server_port = process.env.SERVER_PORT || 3000;

const app = express();

app.get("/", async (req,res) => {
	res.json({hello: "Quindim / Mongoflix challenge"})
});

app.use('/directors', directorsRouter);
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);

app.listen(server_port, ()=>{
	console.log(`Server running at localhost:${server_port}`);
})