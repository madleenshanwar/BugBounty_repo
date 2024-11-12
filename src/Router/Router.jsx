import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from '../page/Register/SignUp';
import Home from '../page/Researcher/Home';
import Login from '../page/Register/Login';
import CompanyDetail from '../page/Researcher/CompanyDetail';
import ChangePass from '../page/Register/ChangePass';
import HomeHeader from '../component/Headers/ResearcherHeader';
import Code from '../page/Register/Code';
import ResetPass from '../page/Register/ResetPass';
import CompanyTable from '../page/Company/CompanyTable';
import ResearcherTable from '../page/Researcher/ResearcherTable';
import ResarherInformation from '../page/Researcher/ResarherProfile';
import Loopholes from '../page/Company/CompanyLoopholes';
import CompanyProfil from '../page/Company/CompanyProfil';
import ChangeCompanyPass from '../page/Company/ChangeCompanyPass';
import AddProgram from '../page/Company/AddProgram';
import ChangeResercherPass from '../page/Researcher/ChangeResearcherPass';
import CompanyHome from '../page/Company/CompanyHome';

export const LazyLogin=lazy(import('../page/Register/Login'))
export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Login/>}/>
      <Route path='/home'  element={<Home/>}/>
      <Route path='/homeCompany' element={<CompanyHome/>}/>
      <Route path='/signup'  element={<SignUp/>}/>
      <Route path='/login'  element={<Login/>}/>
      <Route path='/CompanyTable'  element={<CompanyTable/>}/>
      <Route path='/ResearcherTable'  element={<ResearcherTable/>}/>
      <Route path='/headerhome'  element={<HomeHeader/>}/>
      <Route path='/companyDetail/:index'  element={<CompanyDetail/>}/>
      <Route path='/changePass' element={<ChangePass/>}></Route>
      <Route path='/code' element={<Code/>}></Route>
      <Route path='/resetPass' element={<ResetPass/>}></Route>
      <Route path='ResarherInformation' element={<ResarherInformation/>}></Route>
      <Route path='Loopholes' element={<Loopholes/>}></Route>
      <Route path='CompanyProfil' element={<CompanyProfil/>}/>
      <Route path='changePasswordCompany' element={<ChangeCompanyPass/>}></Route>
      <Route path='handleProgram' element={<AddProgram/>}/>
      <Route path='changePassword' element={<ChangeResercherPass/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}
