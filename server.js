import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";

const app = express();

//app middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

//application port
const port = process.env.PORT || 8080;

app.get("/",(req,res) => {
try {
    res.json("get req")
} catch (error) {
    res.json(error)
}
});

app.listen(port, () => {
    console.log(`server connected to http://localhost:${port}`) 
})