import React from 'react'
import { Head } from './Head'
import AwesomeSlider from 'react-awesome-slider';
export const Banners = () => {
    const data = [
      {uid:1,title:"sunil",description:"no description",image:"123"},
      {uid:1,title:"sunil2",description:"no description",image:"123"},
      {uid:1,title:"sunil3",description:"no description",image:"123"},
      {uid:1,title:"sunil4",description:"no description",image:"123"},
    ]
  return (
    <div class="container">
        <Head props="Banners"/>
        <div style={{width:"500px",margin:'auto'}}>
           <AwesomeSlider>          
          {data&&data.map((user)=>{return(
                    <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{user.title}</h5>
                      {/* <p className='accordion-p btn btn-outline-danger btn-sm' onClick={(e)=>delBanner(e,user.id)}>Delete</p> */}
                    </div>
                    <img src={user.image} className="card-img-bottom" alt="..."/>
                  </div>
          )})}     
            </AwesomeSlider> 
        <div style={{marginTop:"14%"}}>
            <div>
            {/* {error && <div className="error">{error} </div>}  */}
            {/* {Loading}    */}
            </div>
            <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Upload Banners</label>
            <input className="form-control" type="file" id="formFile"/>
            </div>
           
            </div>
            <button className='btn btn-primary'>Upload</button>
      </div>

    </div>
  )
}
