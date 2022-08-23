import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Head } from '../Head';
import axios from 'axios';
export const CardQuiz = () => {
    let domain = "https://pscadda.com/pscadda_app/api/";
    // let img_url='https://pscadda.com/pscadda_app/banner/';
    const { id } = useParams();
    const [title, setTitle] = useState();
    const [status, setStatus] = useState();
    const [numQustion, setNumQustion] = useState();
    const [data, setData] = useState([]);
    useEffect(() => {
        getTest();
    }, [])

    const getTest = () => {
        axios.get(domain + 'get-test?id=' + id).then(res => {
            setData(res.data[0]);
            console.log(res.data);
        })
    }

    const submit = (e) => {
        e.preventDefault();
        const dataField = new FormData();
        dataField.append("id", id);
        dataField.append("title", title);
        dataField.append("status", status);
        dataField.append("numQustion", numQustion);
        axios.post(domain + 'post-quiz', dataField).then(res => { 
            console.log(res.data.message);
            getTest();
        })
    }
    const deleteSection = (id) => {
        if (window.confirm("Are you sure this Test is delete")) {
            axios.post(domain + 'delete_quiz/' + id).then(res =>
                alert(res.data.message),
                getTest()
            );
        }
    }
    return (
        <div className="container">
            <Head props={data && data.test_title} />
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header"><h3 className="text-center font-weight-light my-4">{data && data.test_title} List</h3></div>
                        <div className="card-body">

                            {
                                data.quiz_list?.map((section, index) => (
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
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Qustions</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="col">{index + 1}</th>
                                                    <td><Link to={`/admin-add-upload-qustions/${id}/${section.id}?name=${section.card_title}`}>{section.card_title}</Link></td>
                                                    <td>{section.status}</td>
                                                    <td>{section.numQustion}</td>
                                                    <td><p className='accordion-p btn btn-outline-info btn-sm'><Link to={`/admin-edit-test-series-card/${id}/${section.id}`} style={{ margin: "10px" }}>Edit</Link></p></td>
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
                        <div className="card-header"><h4 className="text-center font-weight-light my-4">New Quiz For {data && data.test_title}</h4></div>
                        <div className="card-body">
                            <form>
                                <div className="form-floating mb-3">
                                    <input className="form-control"
                                        name='title'
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        id="title" type="text" placeholder="Quiz Name" />
                                    <label htmlFor="title">Quiz Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input className="form-control"
                                        name='numQustion'
                                        onChange={(e) => setNumQustion(e.target.value)}
                                        value={numQustion}
                                        id="title" type="text" placeholder="Number Of Qustions" />
                                    <label htmlFor="title">Number Of Qustions</label>
                                </div>
                                <label htmlFor="title">Quiz status</label>
                                <div className="form-floating mb-3">
                                    <select name='status' onChange={(e) => setStatus(e.target.value)} className="form-control">
                                        <option selected >Select Link Type</option>
                                        <option defaultValue ="free">Free</option>
                                        <option defaultValue ="paid">Paid</option>
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
