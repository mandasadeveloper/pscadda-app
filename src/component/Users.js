import React from 'react'
import { Head } from './Head'

export const Users = () => {
  return (
    <div className="container">
        <Head props="Users List"/>
        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                                DataTable Users
                            </div>
                            <div className="card-body">
                                <table className="datatablesSimple table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Sr No.</th> 
                                        <th scope="col">User Name</th>           
                                        <th scope="col">Phone</th>
                                        <th scope="col">City</th>                       
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>   
                                        </tr>
                                    </thead>                        
                                    <tbody>
                                        <tr>
                                            <td>Tiger Nixon</td>
                                            <td>System Architect</td>
                                            <td>Edinburgh</td>
                                            <td>61</td>
                                            <td>2011/04/25</td>
                                            <td>$320,800</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
    </div>
  )
}
