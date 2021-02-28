// Requiring dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Adding a new note
app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "/db/db.json"), (error, response) => {
    if (error) throw (error);
    let notes = JSON.parse(response);
    let noteReq = req.body;
    let newNoteId = notes.length + 1;
    let newNote = {
      id: newNoteId,
      title: noteReq.title,
      text: noteReq.text,
    };
    notes.push(newNote);
    res.json(newNote);
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(notes, null, 2), (err) => {
      if (err) throw (err);
    });
  });
});

// Deleting a note
app.delete("/api/notes/:noteId", (req, res) => {
  fs.readFile(path.join(__dirname, "/db/db.json"), (err, response) => {
    if (err) throw (err);
    let myArray = JSON.parse(response)
    let newArray = myArray.filter (note => note.id != req.params.noteId)
    console.log(newArray)
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(newArray, null, 2), (err) => {
      if (err) throw (err);
    })
    return res.json(response)
  })
})

//Leave this at the bottom. Server listening.
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
