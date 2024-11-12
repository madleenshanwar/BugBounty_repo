import React, { useContext } from 'react'
import { Card, Text, Button, Flex, Group, Avatar } from '@mantine/core';
import { LiaBookmark } from "react-icons/lia";
import { GoGlobe } from "react-icons/go";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { LiaBuilding } from "react-icons/lia";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { ModeContext } from '../../App';

export default function CardCompany({company}) {

  const { primaryColor } = useContext(ModeContext)
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/companyDetail/${company.uuid}`);
  }

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={280} style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.20)' }} >
        <Card.Section><Flex direction='row' align='center' justify='space-between' p={16}>
          <Flex align='center' columnGap={8}>
          <Avatar
              src={company.logo}
              alt={company.name}
              radius='100%'
              height={50}
              color="blue"
            >
              {getInitials(company.name)}
            </Avatar>
            <Text fw={500}>{company.name}</Text>
          </Flex>
          <LiaBookmark color={primaryColor} size={24} />
        </Flex>
        </Card.Section>
        <Group gap={8}>
          <GoGlobe size={16} />
          <Text fw={400}>{company.email}</Text>
          <HiOutlineArrowTopRightOnSquare size={16} />
        </Group>
        {/* <Text size="sm" my={16}>
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </Text> */}
        <Flex gap={16}>
          <Group gap={8}>
            <LiaUserFriendsSolid size={16} color={primaryColor} />
            <Text fw={400}>{company.employess_count}</Text>
          </Group>
          <Group gap={8}>
            <LiaBuilding size={16} color={primaryColor} />
            <Text fw={400}>{company.type}</Text>
          </Group>
        </Flex>
        <Button mt={8} variant="outline" color={primaryColor} onClick={handleClick}>Read more</Button>
      </Card>
    </div>
  )
}
