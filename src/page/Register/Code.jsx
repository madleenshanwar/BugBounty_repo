import React from 'react'
import Header from '../../component/Headers/Header'
import { Flex } from '@mantine/core';
import CodrCard from '../../component/Register/CodrCard';
export default function Code() {
   return (
    <div>
      <Header />
      <Flex justify='center'>
        <CodrCard/>
      </Flex>


    </div>
  )
}
