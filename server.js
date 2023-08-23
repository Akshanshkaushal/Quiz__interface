import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import router from "./routes/route.js";  // have to use .js in backend ony then node.js can understant the location
import connect from "./database/conn.js";

const app = express();

//app middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

//application port
const port = process.env.PORT || 8080;

///
connect();

//routes
app.use("/api", router); //apis


app.get("/",(req,res) => {
try {
    res.json("get req")
} catch (error) {
    res.json(error)
}
});


// start server only when we have a valid connection
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`server connected to http://localhost:${port}`) 
        })
    } catch (error) {
        console.log("cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid database connection"); 
})


