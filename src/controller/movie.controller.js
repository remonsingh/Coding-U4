const express=require('express');
const auhenticate=require('../middleware/authenticate')
const Movie=require('../model/movie.model');
const upload=require('../utils/profilePhoto');
const router=express.Router();
router.post('/',auhenticate,upload.single("poster"),async(req,res)=>{
    try {
        const movie=await Movie.create({
            name:req.body.name,
            actors:req.body.actors,
            languages:req.body.languages,
            directors:req.body.directors,
            poster_url:req.file.path
        });
        res.status(201).json({movie});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.get('/:id',auhenticate,async(req,res)=>{
    try {
        const movie=await Movie.find().lean().exec();
        let c=[];
        movie.forEach(el=>{
            if(movie.el.includes(req.params.id)){
                c.push(movie.el)
            }
        })
        res.status(201).json({movie:c});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
module.exports=router;