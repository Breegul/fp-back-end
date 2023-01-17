// Describes the server/API

const express = require("express"); // Access to the Express library
const cors = require("cors"); // Access to cors library

const { goats, nextId } = require("./goats");
const logger = require("./logger");

const app = express(); // Make a very basic server using Express


// Middleware
// req -> [middleware] -> [endpoint] -> res
// req -> [cors (add header to res)] -> [API] -> res
// req -> [auth (check the req headers for a key)] -> [API] -> response

app.use(cors());
app.use(logger);


// Endpoints
// Tell the app what kinds of request to listen for (and how to handle them)

app.get("/", (req, res) => {
    res.json({
        "message": "Welcome to the GOAT API!"
    });
})

app.get("/goats", (req, res) => {
    
    // Extract query params
    const { maxAge } = req.query;
    
    if (maxAge) {
        res.json(goats.filter(g => g["age"]<=maxAge));
    } else {
        res.json(goats);
    }

})

app.get("/goats/:id", (req, res)=>{
    // req.params looks for : and adds to var
    const id = req.params["id"];
    
    // Filter the goat list for the relevant goat
    const goat = goats.filter(g => g["id"] == id)[0];
    
    if (goat) {
        res.json(goat);
    } else {
        // Send a status of 404 with a message
        res.status(404).json({
            error: "No such goat!"
        });
    }
    
})

module.exports = app; // Make the server available to other files