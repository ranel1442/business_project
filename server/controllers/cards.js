const { Card } = require('../models/Card');
const joi = require('joi');

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await Card.find({}).sort({ "state": 1 });
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting cards' });
        }
    },

    getItem: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string().required(),
            });

            const { error, value } = scheme.validate({ _id: req.params.id });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const result = await Card.findOne({ _id: value._id });
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the card" });
        }
    },

    add: async function (req, res,) {
        try {
            const scheme = joi.object({
                title: joi.string().required().min(2).max(256),
                subTitle: joi.string().required().min(2).max(256),
                description: joi.string().required().min(2).max(1024),
                phone: joi.string().required().min(9).max(14),
                email: joi.string().required().min(6).max(256),
                web: joi.string().min(2).max(4096),
                imageUrl: joi.string().min(2).max(1024),
                imageAlt: joi.string().min(2).max(256),
                state: joi.string().min(2).max(256),
                country: joi.string().required().min(2).max(256),
                city: joi.string().required().min(2).max(256),
                street: joi.string().required().min(2).max(256),
                houseNumber: joi.string().required().min(1).max(5),
                zip: joi.string().min(2).max(256),
                emailCreate: joi.string().min(6).max(256),

            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const newCard = new Card(value);
            const result = await newCard.save();

            res.json({
                ...value,
                _id: result._id
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error add card" });
        }
    },

    delete: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string().required(),
            });

            const { error, value } = scheme.validate({ _id: req.params.id });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const deleted = await Card.findOne({ _id: value._id });

            await Card.deleteOne(value).exec();
            res.json(deleted);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error delete card" });
        }
    },

    edit: async function (req, res, next) {
        try {
            const scheme = joi.object({
                title: joi.string().required().min(2).max(256),
                subTitle: joi.string().required().min(2).max(256),
                description: joi.string().required().min(2).max(1024),
                phone: joi.string().required().min(9).max(14),
                email: joi.string().required().min(6).max(256),
                web: joi.string().min(2).max(4096),
                imageUrl: joi.string().min(2).max(1024),
                imageAlt: joi.string().min(2).max(256),
                state: joi.string().min(2).max(256),
                country: joi.string().required().min(2).max(256),
                city: joi.string().required().min(2).max(256),
                street: joi.string().required().min(2).max(256),
                houseNumber: joi.string().required().min(1).max(5),
                zip: joi.string().min(2).max(256),
                // emailCreate: joi.string().min(6).max(256),

            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const card = await Card.findOneAndUpdate({
                _id: req.params.id
            }, value);

            if (!card) return res.status(404).send('Given ID was not found.');

            const updated = await Card.findOne({ _id: req.params.id });
            res.json(updated);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "fail to update data" });
        }
    },
}