const express=require('express');
const auhenticate=require('../middleware/authenticate')
const Shows=require('../model/shows.model');
const router=express.Router();
router.post('/',auhenticate,async(req,res)=>{
    try {
        const show=await Shows.create(req.body);
        res.status(201).json({show});
    } catch (error){
        res.status(500).json({error:error.message})
    }
})
router.get('/:movieid',auhenticate,async(req,res)=>{
    try {
        console.log(req.params.movieid)
        const show=await Shows.find({name:req.params.movieid}).lean().exec();
        res.status(200).json({show});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})

module.exports=router;