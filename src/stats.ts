import express from 'express'
const router = express.Router();
const stat = require('./models/statSchema')


// get all
router.route('/stats').get(function (req:any, res:any) {
    stat.find(function (err:any, stats:any) {
        res.send(stats)
    })
}
)

// post
router.route('/stats').post(function (req:any, res:any) {

    let stat_instance = new stat({ 'name': req.body.name, 'coding': req.body.coding })
    // save the model instance passing a callback in case of error

    // before saving control if the same stat with the same name doesnt already exist
    let query = stat.findOne({ 'name': req.body.name })
    query.exec(function (err:any, stat:any) {
        if (stat) {
            res.status(500).send('Name exists already');
        } else {
            res.send(' we should save this ');
            stat_instance.save(function (err:any) {
                if (err) console.log(err);
                // saved
                console.log(' this instance has been saved ')
            })
        }
    })

})


router.route('/stats').delete(function (req:any, res:any) {
    let query = stat.findByIdAndRemove(req.body.id)
    query.exec(function (err:any, stat:any) {
        if (err) return res.status(500).send(err);
        if (stat) {
            return res.status(200).send('Successfully deleted')
        } else {
            return res.status(404).send('nothing to delete here')
        }
    })
})


// in the put request only send the time of seconds spent and it would make the addition automatically here
router.route('/stats').put(function (req:any, res:any) {
    let prevCodingValue = stat.findById(req.body.id, {}, (err:any, result:any) => {
        result.coding += req.body.coding
        
        stat.update({_id: req.body.id}, result, (err:any, stat:any) => {
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