"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//TODO make a start date and an end date of the activity
// to be able to extract statistics out of it later
// hours of coding per week/month etc ....
let Schema = mongoose_1.default.Schema;
let statSchema = new Schema({
    name: String,
    coding: Number
});
// compile the model from the schema
let stat = mongoose_1.default.model('Stat', statSchema);
module.exports = stat;
//# sourceMappingURL=statSchema.js.map