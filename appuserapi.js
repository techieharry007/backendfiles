var express = require("express");
var { Pool } = require("pg");
var bodyParser = require("body-parser");
var cors = require("cors");
const path = require("path");
const multer = require("multer");
var app = express();
var pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "apple",
  password: "12345",
  port: 5432,
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/userimages");
  },
  filename: (req, file, cb) => {
    //console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFiltering = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("limited images"));
  }
};

const uploadStorage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: fileFiltering,
});

pool.connect(function (err) {
  if (err) {
    console.log(err, "Error occured");
  }
  console.log("connected");
});
var corsOrigin = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(selectPath));

app.use( express.static(path.join(__dirname, 'public')));
//HTTP POST REQUEST
app.post("/upload", uploadStorage.single("img"),async function (req, res) {
  let {
    fname,
    lname,
    username,
    password,
    email,
    image,
  } = req.body
  const query =  `INSERT INTO appusers (firstname,lastname,username,password,email,image) 
    VALUES('${fname}','${lname}','${username}','${password}','${email}','${req.file.filename}')`;
    return pool
    .query(query)
    .then((data) => {
      return res.status(200).json({ done: "yes" });
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(422).json({ done: "no"},);
    })
});
 //HTTP GET REQUEST
app.get('/upload',async function(req,res){
const query=`SELECT * FROM appusers`
return pool.query(query).then((data)=>{
  return res.status(200).json(data.rows)
}).catch((err)=>{
  console.log("Error",err)
  return res.status(422).send({done:"Error"})
})
})
app.patch("/upload/:id", uploadStorage.single("img"),async function(req,res){
  console.log(req.body)
  console.log(req.file.filename,"images")
  let {firstname,lastname,username,password,email,image}=req.body
  const query=`UPDATE appusers SET firstname='${firstname}',
  lastname='${lastname}',
  username='${username}',
  password='${password}',
  email='${email}',
  image='${image}'
  WHERE id='${req.params.id}'`
 return pool.query(query).then((data)=>{
      return res.status(200).json({done:"yes"})
 }).catch((err)=>{
  return res.status(422).json({done:"no"})
 })
})
//HTTP DELETE REQUEST
app.delete("/upload/:id", async function (req, res) {
  const query = `
      DELETE FROM appusers WHERE id=${req.params.id}
      `;
  return pool
    .query(query)
    .then((data) => {
      return res.json(data, 200);
    })
    .catch((err) => {
      console.error(err.message);
      return res.json({ done: "no" }, 422);
    })
    
});

app.listen(8080);
