const express = require('express');
const router  = express.Router();
const Note = require("../models/Note");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/note', (req, res, next)=>{
  const { text } = req.body;
  
  const newNote = new Note({ text });
  newNote.save((err) => {
    if (err) {
      res.redirect("/", { message: "Something went wrong" });
    } else {
      res.redirect("/");
    }
  });
})

router.get('/note/display', (req, res, next)=>{
  Note.find()
  .then((allNotes)=>{
    res.locals.notes= allNotes;
    res.render('notes');
  })
  .catch((err)=>{
    next(err);
  })
})

module.exports = router;
