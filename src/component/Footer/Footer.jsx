import React from "react";
import { Box, Flex, Text } from "@mantine/core";
import { ImFacebook2, ImInstagram, ImLinkedin } from 'react-icons/im';
import { RiTwitterXFill } from 'react-icons/ri';
export default function Footer() {
  return (
    <Box style={{ backgroundColor: "#F9F9F9", border: "transparent" }}>
      <Flex my={16} mx={64} justify="space-between" align="center">
        <Text c="#9CA3AF" lh={1} fs={32} fw={500}>
          {" "}
          © Bug Bounty Syria{" "}
        </Text>
        <Flex columnGap={48}>
          <Flex columnGap={8}>
            <Text c="#9CA3AF" lh={1} fs={32} fw={500}>
              {" "}
              Privacy{" "}
            </Text>
            <Text c="#9CA3AF" lh={1} fs={32} fw={500}>
              {" "}
              Terms
            </Text>
            <Text c="#9CA3AF" lh={1} fs={32} fw={500}>
              {" "}
              Contact us{" "}
            </Text>
          </Flex>
          <Flex columnGap={8}>
            <ImFacebook2 size={19} color="#9CA3AF" />
            <ImInstagram size={19} color="#9CA3AF" />
            <ImLinkedin size={19} color="#9CA3AF" />
            <RiTwitterXFill size={19} color="#9CA3AF" />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
