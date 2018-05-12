import mongoose from 'mongoose'

//TODO make a start date and an end date of the activity
// to be able to extract statistics out of it later
// hours of coding per week/month etc ....

let Schema = mongoose.Schema

let statSchema = new Schema({
    name: String,
    type: String,
    duration: Number,
    date: Date
})

// compile the model from the schema
let stat = mongoose.model('Stat', statSchema)

module.exports = stat;

