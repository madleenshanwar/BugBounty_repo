import { Box, Button, Flex, Modal, TextInput, Title, Text } from '@mantine/core'
import React, { useContext, useEffect, useState } from 'react'
import { LiaFilterSolid, LiaSearchSolid } from 'react-icons/lia'
import CardCompany from './CardCompany'
import { useDisclosure } from '@mantine/hooks';
import { ModeContext } from '../../App';
import { useTranslation } from 'react-i18next';
import { fetchHomeResearcher } from '../../Api/researcher/Home/HomePage';

export default function ResarcherHome() {
  const [opened, { open, close }] = useDisclosure(false);
  const { primaryColor } = useContext(ModeContext)
  const [search, setSearch] = useState("");
  // const token = localStorage.getItem('token');
  // console.log('token:', token)
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHomeResearcher();
      setCompanies(data);
    };
    fetchData();
  }, []);
console.log(companies)
  // const company = companies.filter((company) =>
  //   company.name.toLowerCase().includes(search.toLowerCase())
  // );

  //handle change language
  const { t } = useTranslation();
  return (
    <div>
      <Box pl={64} pt={16}>
        <Text size="24" fw={600} lh={2}>  Discover opportunities now! </Text>
        <Box h={100} w={1230} m={16} p={8} radius='md' style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0,0,0,0.20)' }}>
          <Text size="16" fw={500} lh={2} c='#990000'>  More than 127 companies are waiting for you. What are you waiting for Start now! </Text>
          <Flex mt="8" justify='space-between'>
            <TextInput w={1050} placeholder="Find the company you want" rightSection={<LiaSearchSolid color='#9CA3AF' />} value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button variant="filled" color='#B21222' >Search</Button>
            <Button variant="outline" color='#B21222' onClick={open} style={{ position: 'relative' }}><LiaFilterSolid size={24} /></Button>
            <Modal opened={opened} onClose={close} centered style={{ position: 'absolute', bottom: 0, left: 0 }}>
              <Flex gap={32} direction={'column'} align={'center'}>
                <Title size="20" lh={1} c={'#3D3C42'}>
                  Sort By
                </Title>
                <Flex gap={10} align={'center'} justify={'center'}>
                  Availability:
                  <Button radius={8} variant="filled" color='#B21222' >Available</Button>
                  <Button radius={8} variant="outline" color='#3D3C42' >Not Available</Button>
                </Flex>
                <Flex gap={10} align={'center'} justify={'center'}>
                  Publication Date:
                  <Button radius={8} variant="filled" color='#B21222' >Oldest</Button>
                  <Button radius={8} variant="outline" color='#3D3C42' >Newest</Button>
                </Flex>
                <Button w={300} radius={8} variant="filled" color='#B21222' >Filter</Button>
              </Flex>
            </Modal>
          </Flex>
        </Box>


        <Box mb={70} >
          <Flex align='center' direction='column' >
            <Text size="24" mb={16} fw={600} lh={2}>  Existing group of companies </Text>
            <Flex wrap='wrap' gap={16} justify='center' mb={24}>

              {companies.map((company ) => {
                  return <CardCompany company={company}/>
                })}
              
            </Flex>
          </Flex>
        </Box>

      </Box>

    </div>
  )
}
