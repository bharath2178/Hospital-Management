const express=require('express');
//console.log("hii");
const cors=require('cors');
const bodyParser = require('body-parser')
const mysql = require("mysql");
const app = express();
app.use(bodyParser.json());
app.use(cors());
//connection to my sql
const dbase = mysql.createConnection({
host: "",
user: "",
password: "",//create database in my sql/////
database:""
});

dbase.connect((error)=> {
    if (error) {
      console.log(error);
    } else {
      console.log("YEAH");
    }
  });

app.listen(9001,()=>{
  console.log("listening to port")
})
//insert
app.post("/patient", (req, res) => {
  let details = {
    pname: req.body.pname,
    age:req.body.age,
    docname: req.body.docname,
    date:req.body.date
  };
  console.log("hii");
   let sql = "INSERT INTO hospital  SET ?";
  dbase.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "failed" });
    } else {
      res.send({ status: true, message: "inserted  successfully" });
    }
  });
});

//select
app.get("/patient", (req, res) => {
 var sql = "SELECT *  FROM hospital";
  dbase.query(sql, (error, result)=> {
    if (error) {
      console.log("dbase failed");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//delete
app.delete("/patient/:id", (req, res) => {
  console.log("hyy");
   let sql = "DELETE FROM hospital WHERE patientid=" + req.params.id + "";
   dbase.query(sql, (error) => {
    if (error) {
      console.log(error);
      res.send({ status: false, message: " Deletion Failed" });
    } else {
      res.send({ status: true, message: " Deleted successfully" });
      console.log("deleted");
    }
  });
});

//login
app.post("/login", (req, res) => {
  const username=req.body.username;
  const password=req.body.password;
 
  console.log('login');
  dbase.query("SELECT * FROM admin WHERE username=? AND password=?",[username,password], (error,result) =>{
    if(error)
    {
      console.log(error);
    }else{
      console.log(result);
      if(result.length >0){
       return res.json("success");
        
      }
      else{
       return res.json("wrong credentials");
      }
    }
    
  })


})


//doctor 
app.post("/doctor", (req, res) => {
let details={
  docname:req.body.docname,
  spec:req.body.spec
} 
let sql = "INSERT INTO doctor  SET ?";
dbase.query(sql, details, (error) => {
  if (error) {
    res.send({ status: false, message: "failed" });
  } else {
    res.send({ status: true, message: "inserted  successfully" });
  }
});})


//select doctors
app.get("/doctor", (req, res) => {
  var sql = "SELECT *  FROM doctor";
   dbase.query(sql, (error, result)=> {
     if (error) {
       console.log("dbase failed");
     } else {
       res.send({ status: true, data: result });
     }
   });
 });


 //delete doctor
 app.delete("/doctor/:id", (req, res) => {
  console.log("hyy");
   let sql = "DELETE FROM doctor WHERE iddoctor=" + req.params.id + "";
   dbase.query(sql, (error) => {
    if (error) {
      console.log(error);
      res.send({ status: false, message: " Deletion Failed" });
    } else {
      res.send({ status: true, message: " Deleted successfully" });
      console.log("deleted");
    }
  });
});