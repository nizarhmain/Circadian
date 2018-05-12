import mongoose from 'mongoose'

let Schema = mongoose.Schema

let taskSchema = new Schema({
    name: String,
    startDate: Date,
    deadline: Date
})

// compile the model from the schema
let task = mongoose.model('Task', taskSchema)

module.exports = task;

