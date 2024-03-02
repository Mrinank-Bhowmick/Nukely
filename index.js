const express = require("express");
const app = express();
const urlRoute = require("./routes/url")
const {connectToMongo} = require("./connect")
const URL = require("./models/url");


connectToMongo("mongodb://localhost:27017/short-url")
.then(console.log("mongodb connected"))

app.use(express.json());
app.use("/url",urlRoute);

app.get("/:shortid",async (req,res)=>{
    const shortId = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push:{
                visitHistory:{
                    timestamp: Date.now(),
                }
            }
        }
    )
    res.redirect(entry.redirectURL)
})

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(8000,()=>"Listening");