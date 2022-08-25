import React, { useState,useEffect} from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Head } from '../../component/Head';
export const EditCardsdose = () => {
    let domain="https://pscadda.com/pscadda_app/api/";
const history=useNavigate();
const {id}=useParams();
const [state, setState] = useState({})


const hendlechange = (e)=>{
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
    axios.get(domain+'get-single-card-dose?id='+id).then(res=>{
        setState(res.data[0]);
})
}


const submit=(e)=>{
    e.preventDefault();
    console.log(state);
    const dataField = new FormData();
    dataField.append("data",JSON.stringify(state));
    axios.post(domain+'create-daily-test',dataField).then(res=>{
    if(res.data.status===200){
    history('/admin-add-daily-test');
    }
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
                                                <input className="form-control" id="title" name='card_title' value={state.card_title} onChange={hendlechange} type="text" placeholder="Test Name" />
                                                <label htmlFor="title">Test Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="title" name='numQustion' value={state.numQustion} onChange={hendlechange} type="text" placeholder="Number Of Qustion" />
                                                <label htmlFor="title">Number Of Questions</label>
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
                                                <button className="btn btn-primary" onClick={submit}>Upload</button>
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
