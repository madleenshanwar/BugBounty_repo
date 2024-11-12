import React, { useContext, useEffect, useState } from 'react'
import HomeHeader from '../../component/Headers/ResearcherHeader'
import { FileButton, Image, Flex, Text, Button, Group, Modal, TextInput } from '@mantine/core';
import { ModeContext } from '../../App';
import { LiaBookmark } from "react-icons/lia";
import { GoGlobe } from "react-icons/go";
import { HiOutlineArrowTopRightOnSquare, HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { LiaBuilding } from "react-icons/lia";
import { BsUpload } from "react-icons/bs";
import TableCompanyDetail from '../../component/Reseacher/TableCompanyDetail';
import { useDisclosure } from '@mantine/hooks';
import Footer from '../../component/Footer/Footer';
import { useParams } from 'react-router-dom';
import { fetchCompanyProfile } from '../../Api/researcher/Home/CompanyProfile';


export default function CompanyDetail() {
  const { primaryColor } = useContext(ModeContext)
  const [file, setFile] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [report, setReport] = useState(' ');

  const [company, setCompany] = useState({
    name:'',
    email:"",
    domain:"",
    type:"",
    descriptioin:"",
    employess_count:""
  });
  const { index } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try{
        const result=await fetchCompanyProfile(index)
        // console.log(result.data.data,"...............")

        setCompany(result)
        // console.log(company)
      }
      catch(err){console.log(err)}
    };
   
      fetchData(); 
   
  }, []);

  return (
    <div>
      <HomeHeader />

      <Flex mx={64} mt={24} justify='space-between'>
        <Flex direction='column' align='start' >
          <Flex direction='row' align='center' justify='space-between' w={664} p={16}>
            <Flex align='center' columnGap={8}>
              <Image
                src='/assets/images/Adobi.png'
                height={78} w={78}
                radius={50}
              />
              <Text size="24" fw={600} lh={1}> Adobi </Text>
            </Flex>
            <LiaBookmark color={primaryColor} size={24} />

          </Flex>
          <Text size='md' my={16}>
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of NorwayWith Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </Text>
          <Flex direction='column' gap={8}>
            <Group mt={8} gap={8}>
              <GoGlobe color={primaryColor} size={16} />
              <Text fw={400}>{company.domain}</Text>
            </Group>
            <Group gap={8}>
              <LiaBuilding size={16} color={primaryColor} />
              <Text fw={400}>{company.type}</Text>
            </Group>
            <Group gap={8}>
              <LiaUserFriendsSolid size={16} color={primaryColor} />
              <Text fw={400}>{company.employess_count}</Text>
            </Group>
          </Flex>
          <Flex gap={24} align='center' justify='center' mt={32}>
            <Button w={151} variant="outline" color={primaryColor} leftSection={<BsUpload size={16} color={primaryColor} />} onClick={open} >Upload file</Button>
            <Button w={151} variant="filled" color={primaryColor} leftSection={<HiOutlineArrowTopRightOnSquare size={16} />}  >Visit site</Button>
          </Flex>
        </Flex>
        <Image
          src='\assets\images\details.png'
          height={350} w={600}
          radius={8}
        />

      </Flex>


      <Flex >
      <TableCompanyDetail />
      </Flex>
      <Footer />


      <Modal radius={16} opened={opened} onClose={close} centered >
        <Flex gap={40} mt={24} wrap='wrap' justify='center'>
          <Text lh={1} fs={32} fw={700}>
            Upload new report
          </Text>
          <Flex direction='column' >
            <TextInput w={318} h={50} required placeholder="Enter report name" rightSection={<HiOutlineClipboardDocumentList color='#9CA3AF' />} onChange={(e) => setReport(e.target.value)} />
            <FileButton w={318} variant="outline" color={primaryColor} onChange={setFile} accept="file/doc,file/docx">
              {(props) => <Button {...props}> <BsUpload size={16} /> </Button>}
            </FileButton>
            <Flex gap={16} mt={24} mb={40}>
              <Button w={151} variant="outline" color={primaryColor} onClick={close} >Cancell sending</Button>
              <Button w={151} variant="filled" color={primaryColor} >Send report</Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </div>
  )
}
