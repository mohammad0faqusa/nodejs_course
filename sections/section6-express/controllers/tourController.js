const fs = require('fs');

const tours =JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)); 

exports.checkBody = (req, res, next)=>{
    const body = req.body; 
    if (!body.name || !body.price){
        return res.status(404).json({
            status:'fail',
            message:'name and price are not found!'
        })
    }
    next();
}
exports.checkId = (req, res, next, val)=>{
    console.log('check id middleware')
    if (val * 1 > tours[tours.length - 1].id){
        return res.status(404).json({
            status:'fail',
            data:{
                message:'the tour is not found'
            }
        })
    }
    next(); 
}
exports.getAllTours = (req, res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        results: tours.length,
        data: {
            tours
        }
    }); 
}
exports.getTour = (req, res)=>{
    const tour = tours.find(el => el.id == req.params.id)
    res.json(tour); 
}
exports.updateTour = (req, res)=>{
    res.status(200).json({
        status:'success',
        data:{
            tour:'<Updated tour here...>'
        }
    })
};
exports.deleteTour = (req, res)=>{
    res.status(204).json({
        status:'success',
        data: null
    })
};
exports.addTour = (req, res)=>{
    const newId = tours[tours.length - 1].id + 1 ; 
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour); 
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status:'success',
            data:{
                tour: newTour
            }
        })
    })
}