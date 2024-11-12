import React from 'react'
import CompanyHeader from '../../component/Headers/CompanyHeader'
import CompanyLoopholesTable from '../../component/Company/LoopholesTable'
import Footer from '../../component/Footer/Footer'

export default function CompanyLoopholes() {
  return (
    <div>
        <CompanyHeader/>
        <CompanyLoopholesTable/>
        <Footer/>
    </div>
  )
}
