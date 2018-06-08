const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const Comment = require("../models/Comment");

const jQuery = require("jquery");
const htmlparser = require("htmlparser2");

/* GET home page */
router.get("/add", (req, res, next) => {
  if(!req.user){
    res.redirect('/');
  }
  res.render("note/note-form");
});

router.post("/add", (req, res, next) => {
  if(!req.user){
    res.redirect('/');
  }
  const { text, title, header } = req.body;

  //removing html tags before saving the
  //might not be needed, since we might not use text formating in the header
  //but if we do, change const to let above
  //   let body = header;
  //   let result = [];
  //   let parser = new htmlparser.Parser(
  //     {
  //       ontext: function(someText) {
  //         result.push(someText);
  //       }
  //     },
  //     { decodeEntities: true }
  //   );
  //   parser.write(body);
  //   parser.end();
  //   header = result.join(' ');

  Note.create({ text, title, header })
    .then(result => {
      res.redirect(`/note/display/${result._id}`);
    })
    .catch(err => {
      next(err);
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

router.get("/display/:noteId", (req, res, next) => {
  Note.findById(req.params.noteId)
    .then(oneNote => {
      res.locals.note = oneNote;
    })
    .then(()=>{
      Comment.find({note: req.params.noteId})
      .then((comment)=>{
        res.locals.comment = comment;
        res.render("note/one-note");
      })
    })
    .catch(err => {
      next(err);
    });
});

router.get("/edit/:noteId", (req, res, next) => {
  if(!req.user){
    res.redirect('/');
  }
  Note.findById(req.params.noteId)
    .then(note => {
      res.locals.note = note;
      res.render("note/edit-one");
    })
    .catch(err => {
      next(err);
    });
});

router.post("/edit/:noteId", (req, res, next)=>{
  if(!req.user){
    res.redirect('/');
  }
    const { title, text, header } = req.body;
    const { noteId } = req.params;
  Note.findByIdAndUpdate( noteId,
  { title, text, header })
  .then(()=>{
      res.redirect(`/note/display/${noteId}`)
  })
  .catch((err)=>{
      next(err);
  })
})



module.exports = router;

// function creatingHeader(text) {
//   let body = text;
//   let result = [];
//   let parser = new htmlparser.Parser(
//     {
//       ontext: function(someText) {
//         result.push(someText);
//       }
//     },
//     { decodeEntities: true }
//   );
//   parser.write(body);
//   parser.end();
//   const forHeader = result;

//   //taking first n words as a header
//   let header = [];
//   for (let i = 0; i < 30; i++) {
//     header.push(forHeader[i]);
//   }
//   header = header.join(" ");
//   header += "...";
//   return header;
// }
