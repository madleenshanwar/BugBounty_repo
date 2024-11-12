import React, { useContext, useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { Box, Button, Divider, Flex, Table } from '@mantine/core'
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../Api/company/profile/product/Product';
import { ModeContext } from '../../App';
import { fetchDeleteProduct } from '../../Api/company/profile/product/DeleteProduct';

export default function LoopholesTable() {
  const [data, setData] = useState([]);
  const { primaryColor } = useContext(ModeContext)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setData(await fetchProducts());
    };
    fetchData();
  }, []);

  const handleDelete = async (uuid) => {
    try {
      await fetchDeleteProduct(uuid);
      setData(data.filter((product) => product.uuid !== uuid));
    } catch (error) {

    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setData(await fetchProducts());
    };
    fetchData();
  }, []);

  const rows = data.map((element, index) => (
    <Table.Tr key={index}>
      <td colSpan={6} style={{ padding: 0 }}>
        <div style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-around',
          backgroundColor: index % 2 !== 0 ? '#EEEEEE' : null,
          borderRadius: index % 2 !== 0 ? '10px' : '0',
          position: 'relative',
          zIndex: index % 2 !== 0 ? 1 : 0,
          boxShadow: index % 2 !== 0 ? '0px 2px 4px rgba(0,0,0,0.25)' : null,
          padding: '16px'
        }}>
          <Table.Td ml='-50px'>{element.title}</Table.Td>
          <Table.Td >{element.url}</Table.Td>
          <Table.Td mr='60px'>{element.description}</Table.Td>
          <Table.Td mr='100px'><Button variant='transparent' onClick={() => handleDelete(element.uuid)}><RiDeleteBin6Line color={primaryColor} size={20} /></Button></Table.Td>
        </div>
      </td>
    </Table.Tr>
  ))
  return (
    <Flex mx={64} mt={16} direction='column' >
      <Table highlightOnHover withRowBorders={false}>
        <Table.Thead >
          <Table.Tr >
            <Flex align='center' justify='space-between' style={{
              fontSize: 16, fontWeight: 500, lineHeight: 3
            }}>
              <Table.Td style={{ color: "#9CA3AF", marginLeft: '100px' }}>Title</Table.Td>
              <Table.Td style={{ color: "#9CA3AF" }}>URL</Table.Td>
              <Table.Td style={{ color: "#9CA3AF" }}>Description</Table.Td>
              <Table.Td style={{ color: "#9CA3AF" }}>Action</Table.Td>
              <Divider />
            </Flex>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Button
        radius={8}
        m='auto'
        variant="outline"
        color={primaryColor}
        onClick={() => {
          navigate("/handleProgram");
        }}
      >
        Add New Program <IoIosAddCircleOutline color={primaryColor} size={20} />
      </Button>
    </Flex>
  )
}
