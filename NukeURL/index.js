const express = require('express');
const app = express();
const PORT = 8080;
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const cors = require('cors');


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Short URL API',
    version: '1.0.0',
    description: 'API to shorten URLs',
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Development server',
    },
  ],
  
};

const options = {
    swaggerDefinition,
    apis: ['./NukeURL/index.js', './NukeURL/routes/url.js'], // path to the API files
};

const swaggerSpec = swaggerJSDoc(options);

if(connectToMongoDB("mongodb://127.0.0.1:27017/short-url")){
    console.log("Mongodb connected");
}

app.use(express.json());
app.use(cors());
app.use('/url', urlRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Short URL API!',
    endpoints: [
      {
        url: '/url',
        method: 'POST',
        description: 'Create a new short URL'
      },
      {
        url: '/:shortID',
        method: 'GET',
        description: 'Redirect to the original URL'
      },
      {
        url: '/api-docs',
        method: 'GET',
        description: 'View the Swagger UI documentation'
      }
    ]
  });
});


/**
 * @swagger
 * /{shortID}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: This endpoint redirects to the original URL associated with the given short ID. Note that Swagger UI can't handle redirects, so you won't be able to test this endpoint directly in Swagger UI. For example, a request to `http://localhost:8080/jTW4Vjzvj` might redirect to `https://youtube.com`.
 */
app.get("/:shortID",async (req,res)=>{
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
    {
        shortID: shortID,
    }, 
    {
        $push: {
            visitHistory: {
                timestamp:Date.now()
            },
        },
    }
    );
    //console.log(entry);
    if(entry){
      res.redirect(entry.redirectURL);
    }
    else{
      res.status(404).send("URL not found");
    }
});

app.listen(PORT,() =>
    console.log(`Server started on PORT: ${PORT}`)
)