import React, { useState,useEffect} from 'react'
// import { Editor } from "react-draft-wysiwyg";
// import { convertToRaw, EditorState,ContentState,convertFromHTML} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
import { Head } from '../Head';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
export const EditCards = () => {
    let domain="https://pscadda.com/pscadda_app/api/";
    // let img_url='https://pscadda.com/pscadda_app/banner/';
const history=useNavigate();
const {id,c_id}=useParams();
// const [banner, setBanner] = useState('')
// const [editorState, setEditorState] = useState(() =>EditorState.createEmpty()); 
const [testValue, setTestValue] = useState({
    card_title:"",
    numQustion:"",
    status:""
})

const handleChange = (e)=>{
const {name,value}=e.target;
setTestValue((preValue)=>{
    return{
        ...preValue,
        [name]:value,
    }
})
}

useEffect(() => {
getTest(id); 
}, [id])

const getTest=(id)=>{
    axios.get(domain+'get-test?id='+id).then(res=>{
        const data = res.data[0].quiz_list
        for (let index = 0; index < data.length; index++) {
            const element = data[index]; 
            if (element.id===c_id) {
                console.log(element);
                setTestValue({
                    card_title:element.card_title,
                    numQustion:element.numQustion,
                    status:element.status
                })
            break;
            }
        }

        })
}

const submit=(e)=>{
e.preventDefault();
const dataField = new FormData();
dataField.append("id",id);
dataField.append("c_id",c_id);
dataField.append("title",testValue.card_title);
dataField.append("status",testValue.status);
dataField.append("numQustion",testValue.numQustion);
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
                                                onChange={handleChange}
                                                value={testValue.card_title}
                                                 id="card_title" type="text" placeholder="Cards Name" />
                                                <label htmlFor="card_title">Cards Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" 
                                                   name='numQustion' 
                                                   onChange={handleChange}
                                                   value={testValue.numQustion}
                                                   id="numQustion" type="text" placeholder="Number Of Qustions" />
                                                <label htmlFor="numQustion">Number Of Qustions</label>
                                            </div>                                            
                                                <div className="form-floating mb-3">
                                                <select name='status' onChange={handleChange} className="form-control">
                                                <option selected>Quiz status</option>
                                                <option  value="free">Free</option>
                                                <option  value="paid">Paid</option>
                                                </select>
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
