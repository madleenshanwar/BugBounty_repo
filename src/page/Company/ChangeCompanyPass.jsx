import React from 'react'
import CompanyHeader from '../../component/Headers/CompanyHeader'
import ChangeCompanyPassCard from '../../component/Company/ChangeCompanyPassCard'
import Footer from '../../component/Footer/Footer'
import { Flex } from '@mantine/core'

export default function ChangeCompanyPass() {
  return (
    <div>
      <CompanyHeader/>
      <Flex justify='center'>
      <ChangeCompanyPassCard/>
      </Flex>
      
      <Footer/>
    </div>
  )
}
