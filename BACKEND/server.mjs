// // console.log("APDS IS KINDA HARD")

// // import http from "http";

// import express from "express";

// //set the port
// const PORT = 3000;
// const app = express();
// const urlprefix = '/api';

// app.use(express.json());

// app.get(urlprefix+'/',(req, res)=>{
//     res.send("This is actually working out OMG!")
// })

// app.get(urlprefix+'/orders',(req, res)=>{
//     const orders = [
//         {
//             id: "1",
//             name: "Orange"
//         },
//         {
//             id: "2",
//             name: "Apple" 
//         },
//         {
//             id: "3",
//             name: "Pineapple" 
//         }
//     ]
//     res.json(
//     {
//         Message: "Fruits",
//         orders: orders
//     }
//     )
// })

// //start the server
// // const server = http.createServer((req,res)=>(
// //     res.end("My Server works!!")
// //     ))

//     // server.listen(PORT)
//     app.listen(PORT);

import https from "https";
import http from "http";
import fs from "fs";
import posts from "./routes/post.mjs";
import users from "./routes/user.mjs";
import express from "express";
import cors from "cors";

const PORT = 3001;
const app = express();

const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync("keys/certificate.pem")
}

app.use(cors());
app.use(express.json());

app.use((reg,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
})

app.use("/post", posts);
app.route("/post", posts);
app.use("/user", users);
app.route("/user", users);

let server = https.createServer(options,app);
console.log(PORT);
server.listen(PORT);