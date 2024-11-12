import React from 'react'
import ResearcherHeader from '../../component/Headers/ResearcherHeader'
import LoopholesResearcherTable from '../../component/Reseacher/ResearcherLoopholesTable'
import Footer from '../../component/Footer/Footer'

export default function ResearcherLoopholes() {
  return (
    <div>
        <ResearcherHeader/>
        <LoopholesResearcherTable/>
        <Footer/>
    </div>
  )
}
