import React, { useState,useEffect} from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Head } from '../Head';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
export const EditCards = () => {
    let domain="https://pscadda.com/pscadda_app/api/";
const history=useNavigate();
const {id,c_id}=useParams();
const [state, setState] = useState({})


const hendleChange = (e)=>{
const {name,value}=e.target;
setState((preValue)=>{
    return{
        ...preValue,
        [name]:value,
    }
})
}

useEffect(() => {
getTest(); 
 // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const getTest=()=>{
    axios.get(domain+'get-single-data?id='+id+'&c_id='+c_id).then(res=>{
        setState(res.data[0]);
})
}


const submit=(e)=>{
e.preventDefault();
const dataField = new FormData();
dataField.append("id",id);
dataField.append("c_id",c_id);
dataField.append("title", state.card_title);
dataField.append("status", state.status);
dataField.append("active", state.active);
dataField.append("numQustion", state.numQustion);
dataField.append("message", state.message); 
axios.post(domain+'post-quiz',dataField).then(res=>{ 
alert(res.data.message);
history('/admin-add-test-series-card/'+id);
getTest();
})
}

  return (
    <div className="container">
                       <Head props='Edit-Test-Cards'/>
                        <div className="row justify-content-center">                                            
                            <div className="col-lg-4">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div>
                            </div>  
                                    <div className="card-header"><h4 className="text-center font-weight-light my-4">Edit Test Cards</h4></div>
                                    <div className="card-body">
                                    <form>
                                <div className="form-floating mb-3">
                                    <input className="form-control"
                                        name='card_title'
                                        onChange={hendleChange}
                                        value={state.card_title}
                                        id="title" type="text" placeholder="Quiz Name" />
                                    <label htmlFor="title">Quiz Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control"
                                        name='numQustion'
                                        onChange={hendleChange}
                                        value={state.numQustion}
                                        id="title" type="text" placeholder="Number Of Qustions" />
                                    <label htmlFor="title">Number Of Qustions</label>
                                </div>

                                <label htmlFor="title">Active Or Deactivate status</label>
                                <div className="form-floating mb-3">
                                    <select name='active' onChange={hendleChange} className="form-control">
                                        <option selected >Select Type</option>
                                        <option value ="active">Active</option>
                                        <option value ="deactive">Deactive</option>
                                    </select>
                                </div>

                                <label htmlFor="title">Quiz status</label>
                                <div className="form-floating mb-3">
                                    <select name='status' onChange={hendleChange} className="form-control">
                                        <option selected >Select Link Type</option>
                                        <option value ="free">Free</option>
                                        <option value ="paid">Paid</option>
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea
                                     className="form-control"
                                     name='message'
                                     onChange={hendleChange}
                                     value={state.message}
                                     id="title" type="text" placeholder="Number Of Qustions"/>
                                    <label htmlFor="title">Message</label>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                    <button onClick={submit} className="btn btn-primary">Upload</button>
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
