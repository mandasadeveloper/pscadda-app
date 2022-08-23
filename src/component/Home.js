import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { 
    // convertToRaw,
     EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
import { Head } from './Head';
export const Home = () => {
const [editorState, setEditorState] = useState(() =>EditorState.createEmpty()); 
const data = [
    {uid:1,title:"Pscadda",description:"no description",image:"/"},
    {uid:1,title:"Pscadda2",description:"no description",image:"/"},
    {uid:1,title:"Pscadda3",description:"no description",image:"/"},
    {uid:1,title:"Pscadda4",description:"no description",image:"/"},
  ];

const deleteSection=()=>{
}
  return (
    <div className="container">
                       <Head props='Home Section'/>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Section List</h3></div>
                                    <div className="card-body">

                                    {
data.map((section,index)=>(
<div key={index} className="accordion-item">
<h2 className="accordion-header">
<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
{`Section-${index+1}`}
</button>
</h2>
<div id={`collapse${index}`} className="accordion-collapse collapse"  data-bs-parent="#accordionExample">
<div className="accordion-body">
<div style={{float:"right"}}>
<p className='accordion-p btn btn-outline-info btn-sm'><Link to={`/admin-home_section-edit/${section.uid}`} style={{margin:"10px"}}>Edit</Link></p>
<p onClick={()=>deleteSection(section.uid)} style={{marginRight:"10px"}} className='accordion-p btn btn-outline-danger btn-sm'>Delete</p>
</div>
<strong>{section.title}</strong> 
<p>{section.description}</p> 
<div><img src={section.image} width={100} alt=""/></div>
</div>
</div>
</div>
))
}
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h4 className="text-center font-weight-light my-4">Add New Sections</h4></div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="title" type="text" placeholder="Section Name" />
                                                <label htmlFor="title">Section Name</label>
                                            </div>
                                          <div className="custom-file">
                                          <input type="file" className="custom-file-input" id="customFile"/>
                                          <label className="custom-file-label" htmlFor="customFile">Upload Banner for Section</label>
                                          </div>  
                                          <div style={{margin:"10px auto"}}>
                                          <label htmlFor="inputdescription4" className="form-label">Add Description for Section</label>
                                          <div className="form-floating mb-3">
                                          <Editor
                                          editorState={editorState}
                                          onEditorStateChange={setEditorState}
                                          />
                                          </div></div>                                    
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">                                               
                                                <a className="btn btn-primary" href="index.html">Upload</a>
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
