import React, { useState,useEffect} from 'react'
import { Link} from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Head } from '../Head';
import axios from 'axios';
export const CreateTestSeries = () => {
    let domain="https://pscadda.com/pscadda_app/api/";
    let img_url='https://pscadda.com/pscadda_app/banner/';
const [banner, setBanner] = useState('');
const [editorState, setEditorState] = useState(() =>EditorState.createEmpty()); 
const [testValue, setTestValue] = useState({
    title:"",
    price:"",
})
const [data, setData]=useState([]);

const uploadBanner=(e)=>{
setBanner(e.target.files[0])
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
getTest();
 // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const getTest=()=>{
axios.get(domain+'get-test').then(res=>{
setData(res.data);
})
}

const submit=(e)=>{
e.preventDefault();
const dataField = new FormData();
dataField.append("banner",banner);
dataField.append("description",draftToHtml(convertToRaw(editorState.getCurrentContent())));
dataField.append("title",testValue.title);
dataField.append("price",testValue.price);
axios.post(domain+'post-test',dataField).then(res=>{
alert(res.data.message);
getTest();
})
}
const deleteSection=(id)=>{
if(window.confirm("Are you sure this Test is delete")){
axios.post(domain+'delete_test/'+id).then(res=>
alert(res.data.message),
getTest()
);}
}
  return (
    <div className="container">
                       <Head props='Test-Series'/>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Series List</h3></div>
                                    <div className="card-body">

                                    {
data.map((section,index)=>{
return(
<>
<div className="accordion-item">
<h2 className="accordion-header">
<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
{section.test_title}
</button>
</h2>
<div id={`collapse${index}`} className="accordion-collapse collapse"  data-bs-parent="#accordionExample">
<div className="accordion-body"> 
<table className="datatablesSimple table table-hover">
        <thead>
            <tr>                                        
            <th scope="col">Title</th>           
            <th scope="col">Price</th>
            <th scope="col">Description</th> 
            <th scope="col">Banner</th>                       
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>   
            </tr>
        </thead>                        
        <tbody>
            <tr>
                <td><Link to={`/admin-add-test-series-card/${section.id}`}>{section.test_title}</Link></td>
                <td>{section.test_price}</td>
                <td>{section.description}</td>
                <td><img src={img_url+section.banner} width={100} alt="" /></td>
                <td><p className='accordion-p btn btn-outline-info btn-sm'><Link to={`/admin-edit-test-series/${section.id}`} style={{margin:"10px"}}>Edit</Link></p></td>
                <td><p onClick={()=>deleteSection(section.id)} style={{marginRight:"10px"}} className='accordion-p btn btn-outline-danger btn-sm'>Delete</p></td>
            </tr>
        </tbody>
    </table>
</div>
</div>
</div>
</>
)
})
}
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h4 className="text-center font-weight-light my-4">Add New Series</h4></div>
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
