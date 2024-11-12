import React, { useContext, useState } from 'react'
import { Table, Button, Box, Divider } from '@mantine/core';
import { ModeContext } from '../../App';
import { useDisclosure } from '@mantine/hooks';

const elements = [
  { VulnerabilityName: "LogIn", CompanyName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "5/10" },
  { VulnerabilityName: "LogIn", CompanyName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Pending", Assessment: "5/10" },
  { VulnerabilityName: "LogIn", CompanyName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Reject", Assessment: "5/10" },
  { VulnerabilityName: "LogIn", CompanyName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "5/10" },
  { VulnerabilityName: "LogIn", CompanyName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Reject", Assessment: "5/10" },
  { VulnerabilityName: "LogIn", CompanyName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Reject", Assessment: "5/10" },
  { VulnerabilityName: "LogIn", CompanyName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Reject", Assessment: "5/10" },
  { VulnerabilityName: "LogIn", CompanyName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "5/10" },
  { VulnerabilityName: "LogIn", CompanyName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "5/10" },
  { VulnerabilityName: "LogIn", CompanyName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "5/10" },
  { VulnerabilityName: "LogIn", CompanyName: "Darrebni", SendDate: "11.5.2024", VulnerabilityFile: "FirstOne.pdf", Status: "Accept", Assessment: "5/10" }
];

export default function TableR() {
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
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <span style={{ textAlign: 'left' }}>{element.VulnerabilityName}</span>
            <span style={{ textAlign: 'center' }}>{element.CompanyName}</span>
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
            <span style={{ textAlign: 'right' }}> {element.Assessment} </span>
          </div>
        </div>
      </td>
    </Table.Tr>
  ));

  return (
    <>
      <Box mx={64} mt={16}>
        <Table highlightOnHover withRowBorders={false} mt={10}>
          <Table.Thead>
            <Table.Tr>
              <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 3 }}>
                <span style={{ padding: 15, color: "#9CA3AF" }}>VulnerabilityName</span>
                <span style={{ padding: 60, color: "#9CA3AF" }}>CompanyName</span>
                <span style={{ paddingLeft:50, color: "#9CA3AF"}}>SendDate</span>
                <span style={{ paddingLeft:120, color: "#9CA3AF" }}>VulnerabilityFile</span>
                <span style={{ paddingLeft:150, color: "#9CA3AF" }}>Status</span>
                <span style={{ paddingLeft:140, color: "#9CA3AF" }}>Assessment</span>
                <Divider />
              </div>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </>
  );


}
