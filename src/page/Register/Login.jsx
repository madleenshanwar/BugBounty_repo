import React from 'react'
import Header from '../../component/Headers/Header';
import { Flex } from '@mantine/core';
import LoginCard from '../../component/Register/LoginCard';
import LoginPage from '../../component/Register/login';

export default function Login() {


  return (
    <div>
      <Header />
      <Flex justify='center'>
        <LoginPage/>
      </Flex>


    </div>
  )
}