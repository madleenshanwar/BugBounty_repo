import React from "react";
import Header from "../../component/Headers/Header";
import { Flex } from "@mantine/core";
import ResetPassCard from "../../component/Register/ResetPassCard";

export default function ResetPass() {
  return (
    <div>
    <Header />
    <Flex justify='center'>
      <ResetPassCard/>
    </Flex>


  </div>
  );
}
