const express = require('express');
const toursControllers = require('./../controllers/toursControllers')

const router = express.Router();

router.use('/:id', toursControllers.checkID)

router.route('/').get(toursControllers.getTours).post(toursControllers.addTour);
router.route('/:id').get(toursControllers.getTour).patch(toursControllers.updateTour).delete(toursControllers.deleteTour); 

module.exports = router; 