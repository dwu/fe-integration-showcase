/* Configuration */
const port = 3000;
/* Configuration End */

const express = require('express');

const app = express();
app.use(express.static('static'));

/* Main */

// Common APIs
app.get('/api/products', (req, res) => {
    res.status(200).send({
        items: {
            1: {
                name: "Product 1",
                price: 100
            },
            2: {
                name: "Product 2",
                price: 200
            },
            3: {
                name: "Product 3",
                price: 300
            }
        }
    });
});

// Scenario 1 - IFrames

app.listen(port, () => console.log(`Listening on port ${port}!`))
