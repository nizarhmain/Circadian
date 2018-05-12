import express from 'express'
const router = express.Router();
const stat = require('./models/statSchema')


// get specifics
router.route('/stats/:type').get(function (req: any, res: any) {
    stat.find(req.params).find((err: any, stats: any) => {
        if (err) return res.status(500).send(err);

        if (stats) {
            let totalTime: number = 0;
            stats.forEach((element: any) => {
                totalTime += element.duration
            });

            return res.status(200).send({
                totalTimeSpent: totalTime,
                stats: stats
            })
        }
    })
}
)


// get all
router.route('/stats').get(function (req: any, res: any) {
    stat.find(function (err: any, stats: any) {
        let types:Array<String> = []
        stats.forEach((element:any) => {
            if(types.indexOf(element.type) === -1) {                
                types.push(element.type)
            }
        });
        res.send({types: types, stats: stats})
    })
}
)


// post
router.route('/stats').post(function (req: any, res: any) {

    let stat_instance = new stat({
        'name': req.body.name,
        'type': req.body.type,
        'duration': req.body.duration,
        'date': req.body.date
    })
    // save the model instance passing a callback in case of error

    // before saving control if the same stat with the same name doesnt already exist
    let query = stat.findOne({ 'name': req.body.name })
    query.exec(function (err: any, stat: any) {
        res.send(' we should save this ');
        stat_instance.save(function (err: any) {
            if (err) console.log(err);
            // saved
            console.log(' this instance has been saved ')
        })
    })

})


router.route('/stats').delete(function (req: any, res: any) {
    let query = stat.findByIdAndRemove(req.body.id)
    query.exec(function (err: any, stat: any) {
        if (err) return res.status(500).send(err);
        if (stat) {
            return res.status(200).send('Successfully deleted')
        } else {
            return res.status(404).send('nothing to delete here')
        }
    })
})


// in the put request only send the time of seconds spent and it would make the addition automatically here
router.route('/stats').put(function (req: any, res: any) {
    stat.findById(req.body.id, {}, (err: any, result: any) => {

        result.duration += req.body.duration

        stat.update({ _id: req.body.id }, result, (err: any, stat: any) => {
            if (err) return res.status(500).send(err);
            if (stat) {
                return res.status(200).send('successfully updated')
            } else {
                return res.status(404).send('nothing to delete here')
            }
        })
    })
})




module.exports = router