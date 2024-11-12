import React from 'react'
import Header from '../../component/Headers/Header'
import { Box, Flex } from '@mantine/core';
import Register from '../../component/Register/Register';

export default function SignUp() {


  return (
    <div >
      <Box >
        <Header />
        <Flex justify='center'>
          <Register />
        </Flex>
      </Box>
    </div>
  )
}
