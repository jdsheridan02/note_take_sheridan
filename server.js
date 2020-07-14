//all the variables and libraries needed for this application
const express = require ("express"),
    path = require ("path"),
    fs = require ("fs"),
    app = express();
    PORT = process.env.PORT || 3000;


//set up body parsing, static and route middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//routes to navigate both HTML files
app.get('/notes', function (req, res) {
  res.sendFile(__dirname + '/public/notes.html');
});

//api call to read and retrieve all notes as JSON, need to read the file as well 
app.get("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function(err, data){
      if (err) throw err;
      console.log(data);
      res.json(JSON.parse(data));
    });
  });
  
  
// 
app.post('/api/notes', function (req, res) {
  // read db.json and convert it to an array of notes
  const notes = JSON.parse(fs.readFileSync(__dirname + '/db/db.json'));
  console.log(notes);
  console.log("*****");
  const newNote = req.body;
  console.log(req.body);
  newNote.id = String(notes.length);
  notes.push(newNote);
  // rewrite to notes file
  fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(notes));
  // sending our notes as JSON data back to the client
  res.json(notes);
});


// app.delete('/api/notes/:id', function (req, res) {
//   var id = req.params.id;
//   // read db.json and convert it to an array of notes
//   const deleted = JSON.parse(fs.readFileSync(__dirname + '/db/db.json'));

//   // remove the note by its id
//   id

//   // rewrite to the notes files
//   fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(notes));
//   // send notes as JSON data back to the client
// });


app.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});

// placing catch all route after all other functions
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});