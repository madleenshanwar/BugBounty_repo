import React from 'react'
import { Flex } from '@mantine/core';
import Header from '../../component/Headers/Header';
import ChangePasswordCard from '../../component/Register/ChangePasswordCard';
export default function ChangePass() {
    return (
      <div>
      <Header />
      <Flex justify='center'>
        <ChangePasswordCard/>
      </Flex>


    </div>
    )
  
}
