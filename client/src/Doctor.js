import React, { useState,useEffect } from 'react'

import './Doctor.css'
import axios from 'axios';
export default function Doctor() {
    const [docname,setDocname] = useState('');
    const [spec,setSpec]=useState('')
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        (async () => await Loadd())();
        }, []);
    async function Loadd(){
      console.log("hiiuseeffect");
      const result= await axios.get("http://localhost:9001/doctor")
      setDoctors(result.data.data);
    }
    async function deleteDoctor(id){
        console.log("hii");
        await axios.delete("http://localhost:9001/doctor/"+id)
        Loadd();
        alert("deleted succesfully")
     }
    const save=async (event)=>{
        try {
          console.log(docname);
          if(docname.length<1 || spec.length <1)
          {
            alert("coloumn not fully filled");
            return 0;
          }
            console.log("hii")
            const res=await axios.post('http://localhost:9001/doctor',{docname:docname,spec:spec}).then(()=>{console.log("success")})
            Loadd();
            console.log("bye")
          } catch (error) {
            console.log(error);
          }
    }
  return (
    <div className='doctor'>
        
        <div>
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-primary">
<div className="container-fluid">
<a className="navbar-brand text-light" href="/">HOSPITAL MANAGEMENT SYSTEM</a>
<a className="nav-link active text-light" aria-current="page" href="/">login</a>
         <a className="nav-link active text-light" aria-current="page" href="/main">Main</a>
</div>
</nav>
<br />
<br />
</div>
<br />
        <div className="info">
          <h3>DETAILS</h3>
        <label>Doctor Name</label>
        <input type="text" onChange={(event)=>{setDocname(event.target.value)}}/>
        
        <label>Specialization</label>
        <input type="text" onChange={(event)=>{setSpec(event.target.value)}}/>
      
      
        <button type="button" class="btn btn-warning" onClick={save}>Save</button>
        </div>
      <div className="container mt-6" >
        <br />
      <table className="table table-primary" align="center">
        
<thead>
<tr>
  <th scope="col"> Id</th>
  <th scope="col">Doctor name</th>
   
  <th scope="col">Specialization</th>
  <th scope="col">DELETE</th>
  
</tr>
</thead>
{doctors.map(function fn(doctor)
       {
            return(
            <tbody>
                <tr>
                <th scope="row">{doctor.iddoctor} </th>
                <td>{doctor.docname}</td>
                
                <td>{doctor.spec}</td>
               
            
                <td>
                    
                     <button type="button" class="btn btn-danger" onClick={()=>{deleteDoctor(doctor.iddoctor)}}>Delete</button> 
                </td>
                </tr>
            </tbody>
            );
            })}
        </table>
        </div>


    </div>
  )
}
