const axios = require('axios')
const URL = require("../models/url")
async function getUUID(){
    try{
        const response = await axios.get("https://generator.bhowmickmrinank.workers.dev/uuid");
        const uuid = response.data.uuid;
        return uuid;
    } catch (error){
        console.error("Error while creating uuid",error);
    }
}

async function handleGenerateNewShortURL(req,res){
    
    const body = req.body;
    
    if(!body.url){
        return res.status(400).json({error: "Url is required"})
    }
    console.log("Here")
    const shortid = await getUUID();
    console.log(shortid)
    
    await URL.create({
        shortId: shortid,
        redirectURL: body.url,
        visitHistory:[]
    })

    return res.json({id : shortid})
}

module.exports={
    handleGenerateNewShortURL
}

