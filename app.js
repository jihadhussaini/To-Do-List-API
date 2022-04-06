const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const router = require("./routes");
const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router); // middleware routing

app.get('/', (req, res ) => {
    res.status(404).send("Hello World")
});

app.get('*', (req, res ) => {
    res.status(404).send("Page Not Found")
});

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
