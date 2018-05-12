"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const stat = require('./models/statSchema');
// get specifics
router.route('/stats/:type').get(function (req, res) {
    stat.find(req.params).find((err, stats) => {
        if (err)
            return res.status(500).send(err);
        if (stats) {
            let totalTime = 0;
            stats.forEach((element) => {
                totalTime += element.duration;
            });
            return res.status(200).send({
                totalTimeSpent: totalTime,
                stats: stats
            });
        }
    });
});
// get all
router.route('/stats').get(function (req, res) {
    stat.find(function (err, stats) {
        let types = [];
        stats.forEach((element) => {
            if (types.indexOf(element.type) === -1) {
                types.push(element.type);
            }
        });
        res.send({ types: types, stats: stats });
    });
});
// post
router.route('/stats').post(function (req, res) {
    let stat_instance = new stat({
        'name': req.body.name,
        'type': req.body.type,
        'duration': req.body.duration,
        'date': req.body.date
    });
    // save the model instance passing a callback in case of error
    // before saving control if the same stat with the same name doesnt already exist
    let query = stat.findOne({ 'name': req.body.name });
    query.exec(function (err, stat) {
        res.send(' we should save this ');
        stat_instance.save(function (err) {
            if (err)
                console.log(err);
            // saved
            console.log(' this instance has been saved ');
        });
    });
});
router.route('/stats').delete(function (req, res) {
    let query = stat.findByIdAndRemove(req.body.id);
    query.exec(function (err, stat) {
        if (err)
            return res.status(500).send(err);
        if (stat) {
            return res.status(200).send('Successfully deleted');
        }
        else {
            return res.status(404).send('nothing to delete here');
        }
    });
});
// in the put request only send the time of seconds spent and it would make the addition automatically here
router.route('/stats').put(function (req, res) {
    stat.findById(req.body.id, {}, (err, result) => {
        result.duration += req.body.duration;
        stat.update({ _id: req.body.id }, result, (err, stat) => {
            if (err)
                return res.status(500).send(err);
            if (stat) {
                return res.status(200).send('successfully updated');
            }
            else {
                return res.status(404).send('nothing to delete here');
            }
        });
    });
});
module.exports = router;
//# sourceMappingURL=stats.js.map