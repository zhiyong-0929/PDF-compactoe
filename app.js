"use strict";

const express = require("express");
const fileUpload = require('express-fileupload');
var bodyParser = require("body-parser");

var exec = require('child_process').execSync
const app = express();
// We need cors middleware to bypass CORS security in browsers.
const cors = require("cors");

app.use(express.static("public"));
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let port = 3000;
var count = 0;
/**
 * The default path
 */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json'); 
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  } 
  console.log(Object.keys(req.files));
  var infile = req.files.input_pdf;
  if (infile == undefined) {
    infile = req.files.uploadedFile;
  }
  console.log(infile);
  var infile_name = __dirname + '/' + infile.name
  console.log(infile_name)
  infile.mv(infile_name, function(err) {
    if (err)
      return res.status(500).send(err);
    compress(infile_name, req.body.dpi);
    count++;
    res.status(200).send({"count": count})
  });
})

app.listen(port, err => {
  console.log(`Listening on port: ${port}`);
});

async function compress(infile, dpi) {
  var shell = __dirname + "/shrinkpdf.sh"
  var des = __dirname + "/public/output.pdf"
  var cmd = shell + " '" + infile + "'" + ' ' + des + ' ' + dpi
  exec(cmd,
      function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
              console.log('exec error: ' + error);
          }
      });
}
