import React, { useContext, useState } from 'react'
import { Table, Button, Box, Modal, Flex, Title, Text, Rating, Image, Divider } from '@mantine/core';
import { ModeContext } from '../../App';
import { useDisclosure } from '@mantine/hooks';

const elements = [
  { VulnerabilityName: "LogIn", ResearherName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "" },
  { VulnerabilityName: "LogIn", ResearherName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Pending", Assessment: "" },
  { VulnerabilityName: "LogIn", ResearherName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Reject", Assessment: "" },
  { VulnerabilityName: "LogIn", ResearherName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "" },
  { VulnerabilityName: "LogIn", ResearherName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Reject", Assessment: "" },
  { VulnerabilityName: "LogIn", ResearherName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Reject", Assessment: "" },
  { VulnerabilityName: "LogIn", ResearherName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Reject", Assessment: "" },
  { VulnerabilityName: "LogIn", ResearherName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "" },
  { VulnerabilityName: "LogIn", ResearherName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "" },
  { VulnerabilityName: "LogIn", ResearherName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "" },
  { VulnerabilityName: "LogIn", ResearherName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "" }
];

export default function TableC() {
  const { primaryColor } = useContext(ModeContext)
  //Modal
  const [value, setValue] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const [assessment, setAssessment] = useState('')
  const handleContinue = () => {
    setAssessment(value);
    close();
  }
  //build table
  const rows = elements.map((element, index,) => (
    <Table.Tr key={index}>
      <td colSpan={6} style={{ padding: 0 }}>
        <div style={{
          backgroundColor: index % 2 !== 0 ? '#EEEEEE' : null,
          borderRadius: index % 2 !== 0 ? '10px' : '0',
          position: 'relative',
          zIndex: index % 2 !== 0 ? 1 : 0,
          boxShadow: index % 2 !== 0 ? '0px 2px 4px rgba(0,0,0,0.25)' : null,
          paddingTop: '10px', paddingBottom: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <span style={{ textAlign: 'left' }}>{element.VulnerabilityName}</span>
            <span style={{ textAlign: 'center' }}>{element.ResearherName}</span>
            <span style={{ textAlign: 'right' }}>{element.SendDate}</span>
            <span style={{ textAlign: 'center' }}>{element.VulnerabilityFile}</span>
            <span style={{ textAlign: 'right' }} ><Button variant='filled'
              h={30} w={90}
              style={{
                color: element.Status === "Pending" ? "#58595B" :
                  element.Status === "Accept" ? "#00B087" :
                    element.Status === "Reject" ? "#DF0404" :
                      "",
                background: element.Status === "Pending" ? "#DFDFDF" :
                  element.Status === "Accept" ? "#9CDDCD" :
                    element.Status === "Reject" ? "#FFC5C5" :
                      "",
                borderColor: element.Status === "Pending" ? "#58595B" :
                  element.Status === "Accept" ? "#00B087" :
                    element.Status === "Reject" ? "#DF0404" :
                      ""
              }
              }
            >
              {element.Status}</Button></span>
            <span style={{ textAlign: 'right' }}>
              {element.Assessment != '' ? value : <>
                <Button variant='transparent' onClick={open}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg></Button>
                <Modal p={0} opened={opened} onClose={close} centered>
                  <Image style={{ position: 'absolute', top: 0, left: 0, height: '100%', opacity: 0.4 }}
                    src="/assets/images/background.png" />
                  <Flex columnGap={16} rowGap={16} wrap='wrap' justify='center'>
                    <Title size="24" lh={1}>
                      Vulnerability Assessment
                    </Title>
                    <Text c="#9CA3AF" lh={1} fs={16} fw={700}>
                      Please Rate The Vulnerability Out Of 5
                    </Text>
                    <Box my={30} style={{ background: '#E9ECF6', width: '446px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px' }}>
                      <Rating value={value} onChange={setValue} size="lg" />
                    </Box>
                  </Flex>
                  <Flex gap={16} align='center' justify='center'>
                    <Button radius={8} w={151} variant="outline" color={primaryColor}
                      onClick={close}>Back</Button>
                    <Button radius={8} w={151} variant="filled" color={primaryColor} onClick={() => handleContinue()} >Send Rate</Button>
                  </Flex>
                </Modal>
              </>
              }
            </span>
          </div>
        </div>
      </td>
    </Table.Tr>
  ));

  return (
    <>
      <Box mx={64} mt={16} >
        <Table highlightOnHover withRowBorders={false} mt={10}>
          <Table.Thead>
            <Table.Tr>
              <div style={{ fontSize: 16, fontWeight: 500 , lineHeight:2}}>
                <span style={{ margin: 15, color: "#9CA3AF" }}>VulnerabilityName</span>
                <span style={{ margin: 60, color: "#9CA3AF" }}>ResearherName</span>
                <span style={{ margin: 40, color: "#9CA3AF" }}>SendDate</span>
                <span style={{ margin: 70, color: "#9CA3AF" }}>VulnerabilityFile</span>
                <span style={{ margin: 75, color: "#9CA3AF" }}>Status</span>
                <span style={{ margin: 70, color: "#9CA3AF" }}>Assessment</span>
                <Divider/>
              </div>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </>
  );


}
