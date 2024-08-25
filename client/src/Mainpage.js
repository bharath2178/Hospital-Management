import React from 'react'
import './Page.css'
import { useEffect,useState } from 'react'
import axios from 'axios';

export default function Mainpage() {
  const [id, setId] = useState(0);
  const [pname, setPname] = useState("");
  const [phno,setPhno] = useState("");
  const [age,setAge] = useState(0);
  const [docname,setDocname] = useState("");
  const [date,setDate] = useState("");
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    (async () => await Load())();
    }, []);
async function Load(){
  console.log("hiiuseeffect");
  const result= await axios.get("http://localhost:9001/patient")
  setPatients(result.data.data);
}
  async function deletePatient(id){
        console.log("hii");
        await axios.delete("http://localhost:9001/patient/"+id)
        Load();
        alert("deleted succesfully")
     }
  const save=async(event)=>{
        try {
        if(pname.length<1 ||age.length<1||docname.length<1||date.length<1)
        {
          alert("coloumns not fully filled");
          return 0;
        }
          console.log("hii")
          const res=await axios.post('http://localhost:9001/patient',{pname:pname,age:age,docname:docname,date:date}).then(()=>{console.log("success")})
          Load();
          console.log("bye")
        } catch (error) {
          console.log(error);
        }
  }
  
    return (
    <div className="Mainpage">
        <div>
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-primary">
<div className="container-fluid">
<a className="navbar-brand text-light" href="/">HOSPITAL MANAGEMENT SYSTEM</a>

         <a className="nav-link active text-light" aria-current="page" href="/"><b>LOGIN</b></a>
         <a className="nav-link active text-light" aria-current="page" href="/doctor"><b>DOCTOR</b></a>
       
</div>
</nav>
<br />
<br />
</div>
<br />
        <div className="info">
          <h3>DETAILS</h3>
        <label>Patient Name</label>
        <input type="text" onChange={(event)=>{setPname(event.target.value)}}/>
        
       
      
        <label>Age</label>
        <input type="number"onChange={(event)=>{setAge(event.target.value)}} />
      
        <label>Doctor consulted</label>
        <input type="text"onChange={(event)=>{setDocname(event.target.value)}} />
        
        <label>Date</label>
        <input type="text" onChange={(event)=>{setDate(event.target.value)}}/>
        <br />
        <button type="button" class="btn btn-warning" onClick={save}>Save</button>
        </div>
      <div className="container mt-6" >
        <br />
      <table className="table table-primary" align="center">
        
<thead>
<tr>
  <th scope="col"> Id</th>
  <th scope="col">Patient Name</th>

  <th scope="col">Age</th>
  <th scope="col">Doctor consulted</th>
  <th scope="col">Date Visited</th>
  <th scope="col">Delete</th>  
</tr>
</thead>
{patients.map(function fn(patient)
       {
            return(
            <tbody>
                <tr>
                <th scope="row">{patient.patientid} </th>
                <td>{patient.pname}</td>
                
                <td>{patient.age}</td>
                <td>{patient.docname}</td>
                <td>{patient.date}</td>
            
                <td>
                    
                    <button type="button" class="btn btn-danger" onClick={()=>deletePatient(patient.patientid)} >Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
        </table>
        </div></div>
  )
}
