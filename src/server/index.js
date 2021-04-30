const dotenv = require("dotenv")
const express = require('express')
const fetch = require('node-fetch');
const cors = require("cors");

dotenv.config()

// Declare a new sever instance
const app = express();

// Declare the port to be used by the server
const port = 3000;

// Body Parser became deprecated since express v4.16.0
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Allow cross-origin policy for all clients
app.use(cors());

// Serve static files from website directory
app.use(express.static('dist'))

// Start listening for requests
app.listen(port, function () {
    // Log a success msg to the console
    console.log("\x1b[32m%s\x1b[0m",
        `Server is running at http://localhost:${port}/`);
})

app.get('/sentimentAnalysis', async function (req, res) {
    try {
        const endpointURL = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=auto&url=${req.query.article}`
        const apiRespose = await fetch(endpointURL)
        const analysisResult = await apiRespose.json()
        res.send(analysisResult)
    } catch (e) {
        res.send({
            status: {
                msg: "Check your Internet connection!"
            }
        })
    }
})
