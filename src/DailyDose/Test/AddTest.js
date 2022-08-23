import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Head } from '../../component/Head';
export const AddTest = () => {
let domain = "https://pscadda.com/pscadda_app/api/";
const [data, setData]=useState([]);
const [disabled, setDisabled]=useState(true);
const [state, setState]=useState({
    id:-1,
});
useEffect(() => {
    getTest();
 // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const hendlechange = (e)=>{
const {name,value}=e.target;
setState((preValue)=>{
    if(value) setDisabled(false);
    else setDisabled(true);
    return{
        ...preValue,
        [name]:value
    }
})
}

const getTest = () => {
    axios.get(domain+'get-daily-dose').then(res => {
        setData(res.data);
    })
}

const submit=(e)=>{
    e.preventDefault();
    console.log(state);
    const dataField = new FormData();
    dataField.append("data",JSON.stringify(state));
    axios.post(domain+'create-daily-test',dataField).then(res=>{
   if(res.data.status===200){
    alert(res.data.message);
    getTest();
   }
    })
    }


const deleteSection=()=>{
}   
  return (
    <div className="container">
                       <Head props='Daily Dose'/>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Daily-Tests-List</h3></div>
                                    <div className="card-body">

                                    {
                                data?.map((section, index) => (
                                <div key={index} className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                        {section.card_title}
                                    </button>
                                </h2>
                                <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <table className="datatablesSimple table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Serial</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Qustions</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="col">{index + 1}</th>
                                                    <td><Link to={`/admin-dailydose-upload-qustions/${section.id}?name=${section.card_title}`}>{section.card_title}</Link></td>
                                                    <td>{section.numQustion}</td>
                                                    <td><p className='accordion-p btn btn-outline-info btn-sm'><Link to={`/admin-edit-dailydose/${section.id}`} style={{ margin: "10px" }}>Edit</Link></p></td>
                                                    <td><p onClick={() => deleteSection(section.id)} style={{ marginRight: "10px" }} className='accordion-p btn btn-outline-danger btn-sm'>Delete</p></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>))
                            }
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h4 className="text-center font-weight-light my-4">Add New Test</h4></div>
                                    <div className="card-body">
                                        <form>  
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="title" name='name' value={state.name} onChange={hendlechange} type="text" placeholder="Test Name" />
                                                <label htmlFor="title">Test Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="title" name='noOfQuestion' value={state.noOfQuestion} onChange={hendlechange} type="text" placeholder="Number Of Qustion" />
                                                <label htmlFor="title">Number Of </label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="title" name='time' value={state.time} onChange={hendlechange} type="text" placeholder="Set Time in Minut" />
                                                <label htmlFor="title">Set Time in Minut</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="title" name='marks' value={state.marks} onChange={hendlechange} type="text" placeholder="Marks" />
                                                <label htmlFor="title">Marks</label>
                                            </div>                                         
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">                                               
                                                <button className="btn btn-primary" disabled={disabled} onClick={submit}>Upload</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}
