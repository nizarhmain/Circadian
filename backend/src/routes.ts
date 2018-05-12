
import express from 'express'
const router = express.Router();
const task = require('./models/taskSchema')

// get all
router.route('/tasks').get(function (req: any, res: any) {
    task.find(function (err: any, tasks: any) {
        res.send(tasks)
    })
}
)

router.route('/tasks').post(function (req: any, res:any) {

    let task_instance = new task({ 'name': req.body.name, 'startDate': req.body.startDate,'deadline': req.body.deadline })
    // save the model instance passing a callback in case of error

    // before saving control if the same task with the same name doesnt already exist
    let query = task.findOne({ 'name': req.body.name })
    query.exec(function (err:any, task:any) {
        if (task) {
            res.status(500).send('Name exists already');
        } else {
            res.send(' we should save this ');
            task_instance.save(function (err:any) {
                if (err) console.log(err);
                // saved
                console.log(' this instance has been saved ')
            })
        }
    })

})

router.route('/tasks').delete(function (req:any, res:any){
    let query = task.findByIdAndRemove(req.body.id)
    query.exec(function(err:any, task:any) {
        if (err) return res.status(500).send(err);
        if(task) {
            return res.status(200).send('Successfully deleted')
        } else {
            return res.status(404).send('nothing to delete here')
        }
    })
})

router.route('/tasks').put(function(req:any,res:any){
    let query = task.findByIdAndUpdate(
        req.body.id,
        req.body,
        {new: true},
        (err:any, task:any) => {
            // handle any database error
            if(err) return res.status(500).send(err);
            if(task) {
                return res.status(200).send(task);
            } else {
                return res.status(404).send('document not found');
            }
        }
    )
})

module.exports = router