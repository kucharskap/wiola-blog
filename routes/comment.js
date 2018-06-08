const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");


router.post("/save/:noteId", (req, res, next)=>{
    const { text, name } = req.body;
    const  note = req.params.noteId;
    
    Comment.create({ text, name, note })
    .then((result)=>{
        res.redirect(`/note/display/${note}`);
    })
    .catch((err)=>{
        next(err);
    })
})

router.get("/delete/:commentId/:noteId", (req, res, next)=>{
    if(!req.user){
        res.redirect('/');
    }
    const { commentId, noteId } = req.params;
    Comment.findByIdAndRemove(commentId)
    .then(()=>{
        res.redirect(`/note/display/${noteId}`);
    })
    .catch((err)=>{
        next(err);
    })
})


module.exports = router;