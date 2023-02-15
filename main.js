/* Configuration */
const port = 3000;
/* Configuration End */

const express = require('express');

const app = express();
app.use(express.static('static'));

/* Main */
var data = {
    1: {
        name: "Product 1",
        description: "This is the awesome product 1",
        price: 100
    },
    2: {
        name: "Product 2",
        description: "This is the even more awesome product 2",
        price: 200
    },
    3: {
        name: "Product 3",
        description: "This is the most awesome product 3",
        price: 300
    }
};

// Common APIs
app.get('/api/products', (req, res) => {
    res.status(200).send({ items: data });
});

app.get('/api/product-info/:id', (req, res) => {
    res.status(200).send(`<h2>Product info for product ${req.params.id}</h2>${data[req.params.id].description}`);
});

// Scenario 1 - IFrames

app.listen(port, () => console.log(`Listening on port ${port}!`))
