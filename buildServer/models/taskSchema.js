"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let Schema = mongoose_1.default.Schema;
let taskSchema = new Schema({
    name: String,
    startDate: Date,
    deadline: Date
});
// compile the model from the schema
let task = mongoose_1.default.model('Task', taskSchema);
module.exports = task;
//# sourceMappingURL=taskSchema.js.map