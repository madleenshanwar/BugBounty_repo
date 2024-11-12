import React, { useContext } from 'react'
import { Table, Box, Divider, Text } from '@mantine/core';
import { ModeContext } from '../../App';

const elements = [
  { ProgramName: "ProgrammOne", ProgramURL: "www.FirstApp.com", Description: "The First Programm..." },
  { ProgramName: "ProgrammTwo", ProgramURL: "www.FirstApp.com", Description: "The First Programm..." },
  { ProgramName: "ProgrammOne", ProgramURL: "www.FirstApp.com", Description: "The First Programm..." },
  { ProgramName: "ProgrammOne", ProgramURL: "www.FirstApp.com", Description: "The First Programm..." }
]

export default function TableCompanyDetail() {
  const { primaryColor } = useContext(ModeContext)

  const rows = elements.map((element, index,) => (
    <Table.Tr key={index} >
      <td colSpan={3} style={{ padding: 0 }}>
        <div style={{
          backgroundColor: index % 2 !== 0 ? '#EEEEEE' : null,
          borderRadius: index % 2 !== 0 ? '10px' : '0',
          position: 'relative',
          zIndex: index % 2 !== 0 ? 1 : 0,
          boxShadow: index % 2 !== 0 ? '0px 2px 4px rgba(0,0,0,0.25)' : null,
          paddingTop: '15px', paddingBottom: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '40px' }}>
            <span  >{element.ProgramName}</span>
            <span style={{ paddingLeft: 150 }}>{element.ProgramURL}</span>
            <span style={{ paddingLeft: 150 }}>{element.Description}</span>
          </div>
        </div>
      </td>
    </Table.Tr>
  ));

  return (
    <div style={{ zIndex: 2  }}>
      <Box my={32} w='1340px' >
        <Text ml={64} size="24" fw={600} lh={2} mb={16}>  Company Program </Text>
        <Box mx="80px" p={24} pt={4} radius='md' style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0,0,0,0.20)' }}>
          <Table withRowBorders={false} >
            <Table.Thead>
              <Table.Tr >
                <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 3 }}>
                  <span style={{ margin: 32, color: '#B21222' }}>ProgramName</span>
                  <span style={{ margin: 120, color: '#B21222' }}>ProgramURL</span>
                  <span style={{ margin: 50, color: '#B21222' }}>Description</span>
                </div>
                <Divider color='#9CA3AF' />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody >{rows}</Table.Tbody>
          </Table>
        </Box>
      </Box>
    </div>
  );
}