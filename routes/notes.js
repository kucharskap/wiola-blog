const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const jQuery = require("jquery");
const htmlparser = require("htmlparser2");

/* GET home page */
router.get("/add", (req, res, next) => {
  res.render("note/note-form");
});

router.post("/", (req, res, next) => {
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

router.get("/display/all", (req, res, next) => {
  Note.find()
    .then(allNotes => {
      res.locals.notes = allNotes;
      res.render("note/notes");
    })
    .catch(err => {
      next(err);
    });
});

router.get("/display/:noteId", (req, res, next)=>{
  Note.findById(req.params.noteId)
  .then((oneNote)=>{
    res.locals.note = oneNote;
    res.render("note/one-note");
  })
  .catch((err)=>{
    next(err);
  })
});

// router.get("/edit/:noteId", (req, res, next)=>{
//   Note.findById(req.params.noteId)
//   .then((note)=>{
//       res.locals.note = note;
//       res.render("note/edit-one");
//   })
//   .catch((err)=>{
//       next(err);
//   })
// })

// router.post("/edit/:noteId", (req, res, next)=>{
//     const { title, text } = req.body;
//     const { noteId } = req.params.noteId;
//     const header = creatingHeader(text);
//   Note.findByIdAndUpdate( noteId,
//   { title, text, header })
//   .then(()=>{
//       res.redirect(`/note/display/${noteId}`)
//   })
//   .catch((err)=>{
//       next(err);
//   })
// })

module.exports = router;


function creatingHeader(text){
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
   return header;
}