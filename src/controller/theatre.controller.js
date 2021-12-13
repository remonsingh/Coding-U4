const express=require('express');
const auhenticate=require('../middleware/authenticate')
const Theatre=require('../model/theatres.model');
const router=express.Router();
router.post('/',auhenticate,async(req,res)=>{
    try {
        const theatre=await Theatre.create(req.body)
        res.status(201).json({theatre})
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

module.exports=router;