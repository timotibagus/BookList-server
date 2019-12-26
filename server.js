const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const cors = require('cors');
const app = express();

const bookRouter = require('./route/book');

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
app.use(bodyParse.json());
app.use(cors());

//Create server port
app.listen(port, () => console.log(`Server listen on port ${port}`));

//Connect to DB
const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
//If connected to DB
db.once('open', () => console.log(`Successfully connected to MongoDB`));
//If failed connect to DB
db.on(`error`, (err) => console.log(err));

//Route
app.use('/books', bookRouter);
