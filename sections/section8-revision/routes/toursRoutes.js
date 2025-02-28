const express = require('express'); 
const toursControllers = require('./../controllers/toursControllers')


const router = express.Router(); 

// router.get('/', (req,res) =>{
//     res.send('hello from tour router')
// })
router.use('/:id', toursControllers.checkId)
router.route('/').get(toursControllers.getAllTours).post(toursControllers.addTour)
router.route('/:id').get(toursControllers.getTour).patch(toursControllers.updateTour).delete(toursControllers.deleteTour); 
module.exports = router ; 