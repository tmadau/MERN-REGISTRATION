const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const postRoute = require('./routes/posts');
const authRoute = require('./routes/authentication'); // Import routes
const PORT = process.env.PORT || 8080; // Setting Port for the API to run on

dotenv.config();

// Connecting to database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('}---------------[connected to db]---------------{')
);

// Checking and validating my connection to mongoose
mongoose.connection.on('connected', () => {
    console.log('}------------[Mongoose is connected]------------{');
});

app.listen(PORT, () => console.log(`}---------[Server running at port ${PORT}]---------{`));

// Middleware
app.use(express.json());
// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
