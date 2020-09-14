const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken'); // For checking logged in users
const Joi = require('@hapi/joi'); // For Validation
const bcrypt = require('bcryptjs'); // For hashing password
const { registerValidation, loginValidation } = require('../validation'); // import validation

// Post a request to register a user
router.post('/register', async (req, res) => {
    // Validating the users data before they register
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user already exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already taken, please try a different one');
    
    // Checking if username already exists
    const usernameExist = await User.findOne({ username: req.body.username });
    if (usernameExist) return res.status(400).send('Username already taken, please try a different one');

    // Hashing the password before it is stored
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Creating a new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id }); // return only the users _id
    } catch (error) {
        res.status(400).send(error);
    }
});

// Post a request to login a user
router.post('/login', async (req, res) => {
    // Validating the users data before they login
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user is valid
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email eamil or password is invalid, please try again');

    // Checking users password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Email or password is invalid, please try again');

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    // res.send('Logged in!');
});

module.exports = router;