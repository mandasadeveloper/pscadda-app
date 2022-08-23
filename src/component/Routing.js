import React from 'react'
import { Route,Routes } from 'react-router-dom';
import { Home } from './Home';
import { Banners } from './Banners';
import { CreateCourse } from './classes/CreateCourse';
import { CardQuiz } from './TestSereis/CardQuiz';
import { CreateTestSeries } from './TestSereis/CreateTestSeries';
import { EditCards } from './TestSereis/EditCards';
import { EditQustions } from './TestSereis/EditQustions';
import { EditTestSeries } from './TestSereis/EditTestSeries';
import { UploadQustions } from './TestSereis/UploadQustions';
import { Users } from './Users';
import { AddPost } from '../DailyDose/AddPost';
import { AddTest } from '../DailyDose/Test/AddTest';
import { AddQuestion } from '../DailyDose/Test/AddQuestion';
import { DailydoseEdit } from '../DailyDose/Test/dailydoseEdit';
export const Routing = () => {
  return (
    <Routes>
             <Route element={<Home/>} path="/admin-home"/>           
             <Route element={<Users/>} path="/admin-users"/> 
             <Route element={<Banners/>} path="/admin-banners"/>   
             <Route element={<CreateTestSeries/>} path="/admin-add-test-series"/>
             <Route element={<CardQuiz/>} path="/admin-add-test-series-card/:id"/>
             <Route element={<UploadQustions/>} path="/admin-add-upload-qustions/:id/:c_id"/>
             <Route element={<AddQuestion/>} path="/admin-dailydose-upload-qustions/:id"/>
             <Route element={<EditCards/>} path="/admin-edit-test-series-card/:id/:c_id"/>
             <Route element={<EditTestSeries/>} path="/admin-edit-test-series/:id"/>
             <Route element={<DailydoseEdit/>} path="/admin-edit-daily-qustions/:id/:index"/>
             <Route element={<EditQustions/>} path="/admin-edit-qustions/:id/:c_id/:index"/>    
             <Route element={<CreateCourse/>} path="/admin-add-classes"/>     
             <Route element={<AddTest/>} path="/admin-add-daily-test"/>    
             <Route element={<AddPost/>} path="/admin-add-post"/>           
    </Routes>
  )
}
