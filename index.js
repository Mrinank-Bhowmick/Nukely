const express = require("express");
const app = express();
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const {connectToMongo} = require("./connect")
const URL = require("./models/url");
const path = require("path")

connectToMongo("mongodb://localhost:27017/short-url")
.then(console.log("mongodb connected"))

app.set("view engine","ejs");
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/url",urlRoute);
app.use("/",staticRoute)

app.get("/test",async (req,res)=>{
    const allUrls = await URL.find({});
    //console.log(allUrls);
    res.render('home',{
        allUrls:allUrls
    });
})

app.get("/go/:shortid",async (req,res)=>{
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