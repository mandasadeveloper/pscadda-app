import React, { useState,useEffect} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState,ContentState,convertFromHTML} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Head } from '../Head';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
export const EditTestSeries = () => {
const history=useNavigate ();
let domain="https://pscadda.com/pscadda_app/api/";
let img_url='https://pscadda.com/pscadda_app/banner/';
const {id}=useParams();
const [banner, setBanner] = useState('')
const [editorState, setEditorState] = useState(() =>EditorState.createEmpty()); 
const [testValue, setTestValue] = useState({
    title:"",
    price:"",
    banner:""
})
const uploadBanner=(e)=>{
setBanner(e.target.files[0])
alert('this file is selected');
}

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
if(id)getTest(); 
 // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const getTest=()=>{
    axios.get(domain+'get-test?id='+id).then(res=>{
        setTestValue({
            title:res.data[0].test_title,
            price:res.data[0].test_price,
        })
        setBanner(res.data[0].banner);
        setEditorState(() =>EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(res.data[0].description)
            )
          ),)
        })
}

const submit=(e)=>{
e.preventDefault();
const dataField = new FormData();
dataField.append("id",id);
dataField.append("banner",banner);
dataField.append("description",draftToHtml(convertToRaw(editorState.getCurrentContent())));
dataField.append("title",testValue.title);
dataField.append("price",testValue.price);
axios.post(domain+'post-test',dataField).then(res=>{
alert(res.data.message);
history('/admin-add-test-series');
getTest();
})
}

  return (
    <div className="container">
                       <Head props='Edit-Test-Series'/>
                        <div className="row justify-content-center">                                            
                            <div className="col-lg-4">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div>
                            <img src={img_url+banner} alt="" width={392}/>
                            </div>  
                                    <div className="card-header"><h4 className="text-center font-weight-light my-4">Edit Test Series</h4></div>
                                    <div className="card-body">
                                        <form>  
                                            <div className="form-floating mb-3">
                                                <input className="form-control" 
                                                name='title' 
                                                onChange={handleChange}
                                                value={testValue.title}
                                                 id="title" type="text" placeholder="Section Name" />
                                                <label htmlFor="title">Series Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" 
                                                   name='price' 
                                                   onChange={handleChange}
                                                   value={testValue.price}
                                                   id="title" type="text" placeholder="Section Name" />
                                                <label htmlFor="title">Series Amount</label>
                                            </div>
                                          <div className="custom-file">
                                          <input type="file"                                               
                                               onChange={uploadBanner}                                              
                                               id="customFile"/>
                                          <label className="custom-file-label" htmlFor="customFile">Upload Banner for Test Series </label>
                                          </div>  
                                          <div style={{margin:"10px auto"}}>
                                          <label htmlFor="inputdescription4" className="form-label">Add Description</label>
                                          <div className="form-floating mb-3">
                                          <Editor
                                          editorState={editorState}
                                          onEditorStateChange={setEditorState}
                                          />
                                          </div></div>                                    
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
