const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const factory = require('./handlerFactory')
const catchAsync = require('./../utils/catchAsync');
const Tour = require('./../models/tourModel');


exports.getCheckoutSession = catchAsync(async(req, res, next) => {
    console.log(req.params.tourID)
    // 1) get the currently booked tour 
    const tour = await Tour.findById(req.params.tourID)

    // 2) create checkout session 
    const session = await stripe.checkout.session.create({
        payment_method_types: ['card'],
        success_url: '',
        cancel_url: '',
        customer_email: req.user.email,
        client_reference_id: req.params.tourID,
        line_items: [
            {
                name: `${tour.name} Tour`,
                description: tour.summary,
                images: ['image-1.jpeg', 'image-2.jpeg'],
                currency: 'usd',
                quantity: 1
            }
        ]
    })

    // 3) Create session as response 
    res.status(200).json({
        status: 'success',
        session
    })

})