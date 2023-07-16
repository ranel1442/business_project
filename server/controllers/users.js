const { User } = require('../models/User');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/dev');

module.exports = {
    login: async function (req, res, next) {

        const schema = joi.object({
            email: joi.string().required().min(6).max(256).email(),
            password: joi.string().required().min(6).max(1024),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(401).send('Unauthorized');
            return;
        }

        try {
            const user = await User.findOne({ email: value.email });
            if (!user) throw Error;
            const validPassword = await bcrypt.compare(value.password, user.password);
            if (!validPassword) throw 'Invalid password';

            const param = { email: value.email };
            const token = jwt.sign(param, config.jwt_token, { expiresIn: '72800s' });

            res.json({
                token: token,
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                isAdmin: user.isAdmin,
                business: user.business,
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send('Invalid data.');
        }
    },

    signup: async function (req, res, next) {
        const schema = joi.object({
            firstName: joi.string().required().min(2).max(256),
            middleName: joi.string().min(2).max(256),
            lastName: joi.string().required().min(2).max(256),
            phone: joi.string().required().min(9).max(14),
            email: joi.string().min(6).max(255).required().email(),
            password: joi.string().min(6).max(1024).required(),
            imageUrl: joi.string().min(2).max(256),
            imageAlt: joi.string().min(2).max(256),
            state: joi.string().min(2).max(256),
            country: joi.string().required().min(2).max(256),
            city: joi.string().required().min(2).max(256),
            street: joi.string().required().min(2).max(256),
            houseNumber: joi.string().required().min(1).max(5),
            zip: joi.string().min(2).max(256),
            business:joi.bool().default(false),
            isAdmin:joi.bool().default(false),

        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(400).json({ error: 'error sign up new user' });
            return;
        }

        try {
            const user = await User.findOne({ email: value.email });
            if (user) {
                return res.status(400).json({ error: "User already registered." });
            }

            const hash = await bcrypt.hash(value.password, 10);

            const newUser = new User({
                firstName: value.firstName,
                lastName: value.lastName,
                phone: value.phone,
                email: value.email,
                country: value.country,
                city: value.city,
                street:value.street,
                houseNumber:value.houseNumber,
                password: hash,
            });

            await newUser.save();

            res.json({
                id: newUser._id,
                firstName: newUser.firstName,
                email: newUser.email
            })
        }
        catch (err) {
            console.log(err.message);
            res.status(400).json({ error: 'error sign up new user' });
        }
    },

    edit: async function (req, res, next) {
        try {
            const scheme = joi.object({
                cardsLove:joi.array()
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const user = await User.findOneAndUpdate({
                email: req.params.email
            }, value);

            if (!user) return res.status(404).send('Given email was not found.');

            const updated = await User.findOne({ email: req.params.email });
            res.json(updated);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "fail to update data" });
        }
    },

    getItem: async function (req, res, next) {
        try {
            const scheme = joi.object({
                email: joi.string().required(),
            });

            const { error, value } = scheme.validate({ email: req.params.email });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const result = await User.findOne({ email: value.email });
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the user" });
        }
    },

}