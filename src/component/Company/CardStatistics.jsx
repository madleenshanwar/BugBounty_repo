import React, { useContext } from 'react'
import { loopholes } from './Listloopholes'
import { ModeContext } from '../../App'
import { LiaBookmark, LiaPhoneVolumeSolid } from "react-icons/lia";
import { LiaStar } from 'react-icons/lia';
import { Avatar, Button, Card, Flex, Group, Text } from '@mantine/core'
import { AiOutlineMail } from "react-icons/ai";

export default function CardStatistics({ researcher }) {

  const { primaryColor } = useContext(ModeContext)
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder w={280} style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.20)' }} >
        <Card.Section><Flex direction='row' align='center' justify='space-between' p={16}>
          <Flex align='center' columnGap={8}>
            <Avatar
              src={researcher.image}
              alt={researcher.name}
              radius='100%'
              height={50}
              color="blue"
            >
              {getInitials(researcher.name)}
            </Avatar>
            <Text fw={500}>{researcher.name}</Text>
          </Flex>
          <LiaBookmark color={primaryColor} size={24} />
        </Flex>

        </Card.Section>
        <Group gap='16px'>
          <LiaStar size={16} />
          <Text fw={600}>{researcher.points}</Text>
        </Group>
        <Flex direction='column' Gap='16px' >
          <Text size="sm" >
            <LiaPhoneVolumeSolid /> {researcher.email}
          </Text>
          <Text size="sm">
            <AiOutlineMail /> {researcher.phone}
          </Text>
        </Flex>
        <Button mt={8} variant="outline" color={primaryColor}>Read more</Button>
      </Card>

    </div>
  )
}
