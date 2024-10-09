import "dotenv/config";
import express from express;

const server_port = process.env.SERVER_PORT || 3000;

const app = express();

app.get("/", async (req,res) => {
	res.json({hello: "Quindim"})
})

app.listen(server_port, ()=>{
	console.log(`Server running at localhost:${server_port}`);
})