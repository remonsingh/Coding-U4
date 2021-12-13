const express=require('express');
const auhenticate=require('../middleware/authenticate')
const Seat=require('../model/seat.model');
const Show=require('../model/shows.model');
const router=express.Router();
router.post('/check/:value',auhenticate,async(req,res)=>{
    try {
        if(req.params.value>10){
            res.send("Seats not available");
        }
        res.status(201).send("Seat booked");
    } catch (er) {
        res.status(500).json({error:er.message});
    }
});
router.get('/:id',auhenticate,async(req,res)=>{
    try {
        const seat=await Show.findById(req.params.id).lean.exec();
        res.status(201).json(seat.total_seats)
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});
router.post('/',auhenticate,async(req,res)=>{
    try {
        const seat=await Seat.create(req.body);
        res.status(201).json({seat});
    } catch (er) {
        res.status(500).json({error:er.message});
    }
});

module.exports=router;