const Joi = require("joi");
const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
    name: { type: String, required: true, maxLength: 100, trim: true },
    // icon: String,
    // background: String,
    banner: { type: String, maxLength: 255 },
    bannerImg: { type: String, maxLength: 255 },
    time: {
        type: new mongoose.Schema({
            day: {
                type: Number,
                min: 0,
                max: 6,
                required: true,
            },
            minutes: {
                type: Number,
                min: 0,
                max: 1440,
                required: true,
            },
        }),
        required: true,
    },
    completed: { type: Boolean, default: false, required: true },
    delayed: { type: Boolean, default: false, required: true },
    // description: String,
    // youtube: String,
    // seasons: [String],
    // cast: [String],
    // characters: [String],
    // episodes:
    // duration:
});

const Show = mongoose.model("Show", showSchema);

function validateShow(show) {
    const schema = Joi.object({
        name: Joi.string().max(100).required(),
        banner: Joi.string().max(255),
        time: Joi.object({
            day: Joi.number().min(0).max(6).integer().required(),
            minutes: Joi.number().min(0).max(1440).integer().required(),
        }).required(),
        completed: Joi.boolean(),
        delayed: Joi.boolean(),
    });

    return schema.validate(show);
}

exports.Show = Show;
exports.validate = validateShow;
