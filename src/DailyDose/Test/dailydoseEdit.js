import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState,ContentState,convertFromHTML} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { useParams } from 'react-router-dom';
import { Head } from '../../component/Head';

export const DailydoseEdit = () => {
let domain="https://pscadda.com/pscadda_app/api/";
const {id,index}=useParams();
const [time, setTime] = useState('');
const [getEnglish, setGetEnglish] = useState([]);
const [getHindi, setGetHindi] = useState([]);
const [numOfQustion, setNumOfQustion] = useState('');
const [editorState, setEditorState] = useState(() =>EditorState.createEmpty()); 
const [marks, setMarks] = useState('');
const [hindi, setHindi] = useState({
questionText:"",
option_1:"",
option_2:"",
option_3:"",
option_4:"",
answer:"",
description:""
});
const [english, setEnglish] = useState({
    questionText:"",
    option_1:"",
    option_2:"",
    option_3:"",
    option_4:"",
    answer:"",
    description:""
    })
    
   useEffect(() => {    
    getTest();    
   }, []);
const getTest=()=>{
axios.get(domain+'get-daily-dose?id='+id+'&questions=hienglish').then(res=>{
let getHindiData = JSON.parse(res.data.hindi).questions;
let getEnglishData = JSON.parse(res.data.english).questions;
setGetHindi(getHindiData);
setGetEnglish(getEnglishData);
setEditorState(() =>EditorState.createWithContent(
ContentState.createFromBlockArray(
convertFromHTML(res.data.instructions)
)
),)
setNumOfQustion(res.data.numOfQustion);
setMarks(res.data.marks);
setTime(res.data.time)
setHindi({
questionText:getHindiData[index]?.questionText,
option_1:getHindiData[index]?.answers[0].text,
option_2:getHindiData[index]?.answers[1].text,
option_3:getHindiData[index]?.answers[2].text,
option_4:getHindiData[index]?.answers[3].text,
answer:getHindiData[index]?.answers.find(element=>element.score === 1).text,
description:getHindiData[index]?.description 
});
setEnglish({
    questionText:getEnglishData[index]?.questionText,
    option_1:getEnglishData[index]?.answers[0].text,
    option_2:getEnglishData[index]?.answers[1].text,
    option_3:getEnglishData[index]?.answers[2].text,
    option_4:getEnglishData[index]?.answers[3].text,
    answer:getEnglishData[index]?.answers.find(element=>element.score === 1).text,
    description:getEnglishData[index]?.description 
    });
})
 };
const handleChange=(e)=>{
const {name,value}=e.target;
setHindi((preValue)=>{
    return{
        ...preValue,
        [name]:value,
    }
})
}
const handleChange2=(e)=>{
    const {name,value}=e.target;
    setEnglish((preValue)=>{
        return{
            ...preValue,
            [name]:value,
        }
    })
    }
const upload=(e,len,lang)=>{
e.preventDefault();
const data_value = [];
if(len&&lang){
    const res_data = {
        "questionText": lang.questionText,
        "answers": [
          {
            "text": lang.option_1,
            "score": lang.option_1 === lang.answer ? 1 : 0,
          },
          {
            "text": lang.option_2,
            "score": lang.option_2 === lang.answer ? 1 : 0,
          },
          {
            "text": lang.option_3,
            "score": lang.option_3 === lang.answer ? 1 : 0,
          },
          {
            "text": lang.option_4,
            "score": lang.option_4 === lang.answer ? 1 : 0,
          }
        ],
        "description": lang.description,
    }
    for (let i = 0; i < len.length; i++) {
        if(parseInt(index)===i)data_value.push(res_data);
        else data_value.push(len[i]);
    }
}
const dataField = new FormData();
dataField.append("id",id);
dataField.append("hindi",lang===hindi?JSON.stringify({"questions":data_value}):JSON.stringify({"questions":getHindi}));
dataField.append("english",lang===english?JSON.stringify({"questions":data_value}):JSON.stringify({"questions":getEnglish}));
dataField.append("time",time);
dataField.append("numOfQustion",numOfQustion);
dataField.append("instructions",draftToHtml(convertToRaw(editorState.getCurrentContent())));
dataField.append("marks",marks);
axios.post(domain+'dailydose-upload-qustion',dataField).then(res=>{
alert(res.data.message)
})
}
  return (
<div className="container" onLoad={()=>getTest()}>
    <Head props='Edit-Qustions'/>
     <div className="row justify-content-center">
     <div className="col-lg-4">
             <div className="card shadow-lg border-0 rounded-lg mt-5">
                 <div className="card-header"><h4 className="text-center font-weight-light my-4">Edit Qustion In Hindi</h4></div>
                 <div className="card-body">
                     <form>  
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='questionText'  
                             onChange={handleChange}                           
                             value={hindi.questionText}
                              id="questionText" type="text" />
                             <label htmlFor="questionText">Qustion:-</label>
                         </div>
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='option_1'  
                             onChange={handleChange}                           
                             value={hindi.option_1}
                              id="option_1" type="text" />
                             <label htmlFor="option_1">Option-1:-</label>
                         </div>   
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='option_2'  
                             onChange={handleChange}                           
                             value={hindi.option_2}
                              id="option_2" type="text" />
                             <label htmlFor="option_2">Option-2:-</label>
                         </div> 
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='option_3'  
                             onChange={handleChange}                           
                             value={hindi.option_3}
                              id="option_3" type="text" />
                             <label htmlFor="option_3">Option-3:-</label>
                         </div> 
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='option_4'  
                             onChange={handleChange}                           
                             value={hindi.option_4}
                              id="option_4" type="text" />
                             <label htmlFor="option_4">Option-4:-</label>
                         </div> 
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='answer'  
                             onChange={handleChange}                           
                             value={hindi.answer}
                              id="answer" type="text" />
                             <label htmlFor="answer">Answer:-</label>
                         </div>
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='description'  
                             onChange={handleChange}                           
                             value={hindi.description}
                              id="description" type="text" />
                             <label htmlFor="description">description:-</label>
                         </div>
                                                                                                
                         <div className="d-flex align-items-center justify-content-between mt-4 mb-0">                                               
                             <button onClick={(e)=>upload(e,getHindi,hindi)} className="btn btn-primary">Upload</button>
                         </div>
                     </form>
                 </div>
                 <div className="card-footer text-center py-3">
                     <div className="small"></div>
                 </div>
             </div>
         </div>
         <div className="col-lg-4">
             <div className="card shadow-lg border-0 rounded-lg mt-5">
                 <div className="card-header"><h4 className="text-center font-weight-light my-4">Edit Qustion In English</h4></div>
                 <div className="card-body">
                     <form>  
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='questionText'  
                             onChange={handleChange2}                           
                             value={english.questionText}
                              id="questionText" type="text" />
                             <label htmlFor="questionText">Qustion:-</label>
                         </div>
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='option_1'  
                             onChange={handleChange2}                           
                             value={english.option_1}
                              id="option_1" type="text" />
                             <label htmlFor="option_1">Option-1:-</label>
                         </div>   
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='option_2'  
                             onChange={handleChange2}                           
                             value={english.option_2}
                              id="option_2" type="text" />
                             <label htmlFor="option_2">Option-2:-</label>
                         </div> 
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='option_3'  
                             onChange={handleChange2}                           
                             value={english.option_3}
                              id="option_3" type="text" />
                             <label htmlFor="option_3">Option-3:-</label>
                         </div> 
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='option_4'  
                             onChange={handleChange2}                           
                             value={english.option_4}
                              id="option_4" type="text" />
                             <label htmlFor="option_4">Option-4:-</label>
                         </div> 
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='answer'  
                             onChange={handleChange2}                           
                             value={english.answer}
                              id="answer" type="text" />
                             <label htmlFor="answer">Answer:-</label>
                         </div>
                         <div className="form-floating mb-3">                                             
                             <textarea className="form-control" 
                             name='description'  
                             onChange={handleChange2}                           
                             value={english.description}
                              id="description" type="text" />
                             <label htmlFor="description">description:-</label>
                         </div>
                                                                                                
                         <div className="d-flex align-items-center justify-content-between mt-4 mb-0">                                               
                         <button onClick={(e)=>upload(e,getEnglish,english)} className="btn btn-primary">Upload</button>
                         </div>
                     </form>
                 </div>
                 <div className="card-footer text-center py-3">
                     <div className="small"></div>
                 </div>
             </div>
         </div>
         <div className="col-lg-4">
             <div className="card shadow-lg border-0 rounded-lg mt-5">
                 <div className="card-header"><h4 className="text-center font-weight-light my-4">Edit Additional</h4></div>
                 <div className="card-body">
                 <form>  
                                            <div className="form-floating mb-3">                                             
                                                <input className="form-control" 
                                                name='time' 
                                                onChange={(e)=>setTime(e.target.value)}
                                                value={time}
                                                 id="time" type="text" />
                                                <label htmlFor="time">Set Time in Minutes (ex. 120)</label>
                                            </div>  
                                            <div className="form-floating mb-3">
                                                <input className="form-control" 
                                                name='marks' 
                                                onChange={(e)=>setMarks(e.target.value)}
                                                value={marks}
                                                 id="marks" type="text" />
                                                <label htmlFor="marks">Total Marks</label>
                                            </div> 
                                            <div className="form-floating mb-3">
                                                <input className="form-control" 
                                                name='numOfQustion' 
                                                onChange={(e)=>setNumOfQustion(e.target.value)}
                                                value={numOfQustion}
                                                 id="numOfQustion" type="text" />
                                                <label htmlFor="numOfQustion">Number Of Qustions</label>
                                            </div>   
                                            <div style={{margin:"10px auto"}}>
                                          <label htmlFor="inputdescription4" className="form-label">Add Instructions</label>
                                          <div className="form-floating mb-3">
                                          <Editor
                                          editorState={editorState}
                                          onEditorStateChange={setEditorState}
                                          />
                                          </div></div>                                                                        
                                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">                                               
                                                <button onClick={upload} className="btn btn-primary">Upload</button>
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
