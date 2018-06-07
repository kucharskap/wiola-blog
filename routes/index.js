const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const jQuery = require("jquery");
const htmlparser = require("htmlparser2");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.post("/note", (req, res, next) => {
  const { text, title } = req.body;

  //removing html tags before saving the header
  let body = text;
  let result = [];
  let parser = new htmlparser.Parser(
    {
      ontext: function(someText) {
        result.push(someText);
      }
    },
    { decodeEntities: true }
  );
  parser.write(body);
  parser.end();
  const forHeader = result;

  //taking first n words as a header
  let header = [];
  for (let i = 0; i < 30; i++) {
    header.push(forHeader[i]);
  }
  header = header.join(" ");
  header += "...";

  //saving the note
  const newNote = new Note({ text, title, header });
  newNote.save(err => {
    if (err) {
      res.redirect("/", { message: "Something went wrong" });
    } else {
      res.redirect("/note/display/all");
    }
  });
});

router.get("/note/display/all", (req, res, next) => {
  Note.find()
    .then(allNotes => {
      res.locals.notes = allNotes;
      res.render("notes");
    })
    .catch(err => {
      next(err);
    });
});

router.get("/note/display/:noteId", (req, res, next)=>{
  Note.findById(req.params.noteId)
  .then((oneNote)=>{
    res.locals.note = oneNote;
    res.render("one-note");
  })
  .catch((err)=>{
    next(err);
  })
});

// router.get("/note/edit/:noteId", (req, res, next)=>{
//   res.render("")
// })

// router.post("/note/edit/:noteId", (req, res, next)=>{
//   Note.findByIdAndUpdate(req.params.noteId,
//   )
// })

module.exports = router;
