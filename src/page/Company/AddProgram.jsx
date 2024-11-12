import React from 'react'
import AddProgramCard from '../../component/Company/AddProgramCard'
import Footer from '../../component/Footer/Footer'
import CompanyHeader from '../../component/Headers/CompanyHeader'
import { Flex } from '@mantine/core'

export default function AddProgram() {
  return (
    <div>
        <CompanyHeader/>
      <Flex justify='center'>
      <AddProgramCard/>
      </Flex>
    <Footer/>
    </div>
  )
}
