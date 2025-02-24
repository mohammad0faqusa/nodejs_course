const fs = require('fs');

var tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.checkID = (req, res, next)=>{
    if ((req.param.id * 1 > tours[tours.length -1].id) && tours.find(el => el.id === req.params.id * 1) )
        return res.status(404).json({
            status:'fail',
            message:'could not find the tour'
    })
    req.tour = tours.find(el => el.id === req.params.id * 1)
    next(); 
}

exports.getTours = (req, res)=>{
    res.status(200).json({
        status:'success',
        message:{
            tours
        }
    })
}

exports.addTour = (req, res)=>{
    const newId = {id : tours[tours.length-1].id + 1} ; 
    const newTour = Object.assign(newId, req.body); 
    tours.push(newTour); 
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err =>{
        if (err)
            console.log(err)
        console.log('the tours file is written successfully')
    })

    res.status(200).json({
        status:'success',
        message:{
            newTour
        }
    })
}

exports.getTour = (req, res)=>{
    const tour = tours[req.params.id * 1]
    return res.status(200).json({
            status:'success',
            message:{
                tour
            }
        })
}
exports.updateTour = (req, res)=>{
    tours[req.params.id * 1] = {...tours[req.params.id * 1], ...req.body} 
    const tour = tours[req.params.id * 1]

    return res.status(200).json({
        status:'success',
        message:{
            tour
        }
    })
}
exports.deleteTour = (req, res)=>{
    console.log(req.tour)
    const index = tours.indexOf(req.tour);
    if (index > -1) { // only splice tours when item is found
        tours.splice(index, 1); // 2nd parameter means remove one item only
    }
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err =>{
        if (err)
            console.log(err)
        console.log('the tours file is written successfully')
    })
    return res.status(200).json({
        status:'success',
        message:{
            action:'the element is removed',
            tour: req.tour
        }
    })
}
