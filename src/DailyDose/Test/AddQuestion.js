import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ExcelRenderer } from 'react-excel-renderer';
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { Head } from '../../component/Head';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export const AddQuestion = () => {
  let domain = "https://pscadda.com/pscadda_app/api/";
  const { id} = useParams();
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('name');
  const [hindi, setHindi] = useState([]);
  const [getEnglish, setGetEnglish] = useState([]);
  const [getHindi, setGetHindi] = useState([]);
  const [english, setEnglish] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [time, setTime] = useState('');
  const [numOfQustion, setNumOfQustion] = useState('');
  const [marks, setMarks] = useState('');
  const data ="";

  useEffect(() => {
    getTest();
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTest = () => {
    axios.get(domain + 'get-daily-dose?id=' + id + '&questions=hienglish').then(res => {
      setGetHindi(JSON.parse(res.data.hindi).questions);
      setGetEnglish(JSON.parse(res.data.english).questions);
    })
  }


  const handleInputs = (e, test_list) => {
    const fileObj = e.target.files[0];
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        if (fileObj.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          for (var i = 0; i < resp.rows.length; i++)
            if (i % 8 === 0) {
              const index = i / 8;

              const data = {
                "questionText": `${index + 1}.${resp.rows[i]}`,
                "answers": [
                  {
                    "text": `${resp.rows[i + 1][0]}`,
                    "score": resp.rows[i + 1][0] === resp.rows[i + 5][0] ? 1 : 0
                  },
                  {
                    "text": `${resp.rows[i + 2][0]}`,
                    "score": resp.rows[i + 2][0] === resp.rows[i + 5][0] ? 1 : 0
                  },
                  {
                    "text": `${resp.rows[i + 3][0]}`,
                    "score": resp.rows[i + 3][0] === resp.rows[i + 5][0] ? 1 : 0
                  },
                  {
                    "text": `${resp.rows[i + 4][0]}`,
                    "score": resp.rows[i + 4][0] === resp.rows[i + 5][0] ? 1 : 0
                  }
                ],
                "description": `${resp.rows[i + 6][0]}`
              }
              if (test_list === 'hindi') {
                hindi.push(data);
                setHindi(JSON.stringify({"questions":hindi}));
              } else {
                english.push(data);
                setEnglish(JSON.stringify({"questions":english}));
              }
            }
        } else {
          alert('please selet only Excel sheet');
        }
      }
    })

  }


  const submit = (e) => {
    e.preventDefault();
    const dataField = new FormData();
    dataField.append("id", id);
    dataField.append("hindi", hindi);
    dataField.append("english", english);
    dataField.append("time", time);
    dataField.append("numOfQustion", numOfQustion);
    dataField.append("instructions", draftToHtml(convertToRaw(editorState.getCurrentContent())));
    dataField.append("marks", marks);
    axios.post(domain + 'dailydose-upload-qustion', dataField).then(res => {
      getTest();
      console.log(res.data);
    })
  }



  const deleteSection = (index) => {
    if (window.confirm("Are you sure this Test is delete")) {
      const delete_hindi = [];
      const delete_english = [];
      const hindi = getHindi;
      const english = getEnglish;
      for (let i = 0; i < hindi.length; i++) {
        if(index===i){
          hindi.splice(i, 0);
          english.splice(i, 0);
        }
        else {
          delete_hindi.push(hindi[i]);
          delete_english.push(english[i]);
        }
      }
      const dataField = new FormData();
      dataField.append("id", id);
      dataField.append("hindi", JSON.stringify({"questions":delete_hindi}));
      dataField.append("english", JSON.stringify({"questions":delete_english}));
      dataField.append("time", data.total_time);
      dataField.append("numOfQustion", data.total_qustion);
      dataField.append("marks", data.marks);
      dataField.append("instructions", data.instructions);
      axios.post(domain+'dailydose-upload-qustion', dataField).then(res => {
        alert(res.data.message);
        getTest();
      }
      )

    }
  }
  return (
    <div className="container">
      <Head props={name} />
      <div className="row justify-content-center">
        {
          getHindi.length > 0 ?
            <div className="col-lg-8">
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header"><h3 className="text-center font-weight-light my-4">{name} Qustions</h3></div>
                <div className="card-body">

                  {
                    getHindi?.map((section, index) => (
                      <div key={index} className="accordion-item">
                        <h2 className="accordion-header">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                            {section.questionText}
                          </button>
                        </h2>
                        <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <table className="datatablesSimple table table-hover">
                              <thead>
                                <tr>
                                  <th scope="col">Hindi</th>
                                  <th scope="col">English</th>
                                  <th scope="col"><Link to={`/admin-edit-daily-qustions/${id +'/'+index}`}>Edit</Link></th>
                                  <th scope="col"><button className='accordion-p btn btn-outline-danger btn-sm' onClick={() => deleteSection(index)}>Delete</button></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Q.{section.questionText}</td>
                                  <td>Q.{getEnglish[index].questionText}</td>
                                </tr>
                                <tr>
                                  <td>A.{section.answers[0].text}</td>
                                  <td>A.{getEnglish[index].answers[0].text}</td>
                                </tr>
                                <tr>
                                  <td>B.{section.answers[1].text}</td>
                                  <td>B.{getEnglish[index].answers[0].text}</td>
                                </tr>
                                <tr>
                                  <td>C.{section.answers[2].text}</td>
                                  <td>C.{getEnglish[index].answers[2].text}</td>
                                </tr>
                                <tr>
                                  <td>D.{section.answers[3].text}</td>
                                  <td>D.{getEnglish[index].answers[3].text}</td>
                                </tr>
                                <tr>
                                  <td>Answer:{section.answers?.map(ele=>ele.score===1?ele.text:null)}</td>
                                  <td>Answer:{getEnglish[index].answers?.map(ele=>ele.score===1?ele.text:null)}</td>
                                </tr>
                                <tr>
                                  <td>Description:{section.description}</td>
                                  <td>Description:{getEnglish[index].description}</td>
                                </tr>
                              </tbody>
                            </table>
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
            </div> : <div className="col-lg-6">
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header"><h4 className="text-center font-weight-light my-4">New Quiz For {name}</h4></div>
                <div className="card-body">
                  <form>
                    <div className="form-floating mb-3">
                      <div className="input-field col s12 m6">
                        <label htmlFor="Hindi" className="form-label">Upload Hindi Qustion Excel Sheet</label>
                        <input type="file" className="form-control" id="Hindi"
                          onChange={(e) => handleInputs(e, 'hindi')} />
                      </div>
                      <div className="input-field col s12 m6">
                        <label htmlFor="Hindi" className="form-label">Upload English Qustion Excel Sheet</label>
                        <input type="file" className="form-control" id="Hindi"
                          onChange={(e) => handleInputs(e, 'english')} />
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      <input className="form-control"
                        name='time'
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                        id="time" type="text" />
                      <label htmlFor="time">Set Time in Minutes (ex. 120)</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input className="form-control"
                        name='marks'
                        onChange={(e) => setMarks(e.target.value)}
                        value={marks}
                        id="marks" type="text" />
                      <label htmlFor="marks">Total Marks</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input className="form-control"
                        name='numOfQustion'
                        onChange={(e) => setNumOfQustion(e.target.value)}
                        value={numOfQustion}
                        id="numOfQustion" type="text" />
                      <label htmlFor="numOfQustion">Number Of Qustions</label>
                    </div>
                    <div style={{ margin: "10px auto" }}>
                      <label htmlFor="inputdescription4" className="form-label">Add Instructions</label>
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
        }
      </div>
    </div>
  )
}
