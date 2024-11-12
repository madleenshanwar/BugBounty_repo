import { Button, Flex, Text, Textarea, TextInput, Title } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "../../App";
import { CiGlobe } from "react-icons/ci";
import { MdPadding } from "react-icons/md";
import { fetchAddProduct } from "../../Api/company/profile/product/AddProduct";

export default function AddProgramCard() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [program, setProgram] = useState({
    title: '',
    description: '',
    url: ''
  });
  const navigate = useNavigate();
  const { primaryColor } = useContext(ModeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgram((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = async (e) => {
    const { name } = e.target;
    // try {
    //   await validationSchemaResarcher.validateAt(name, { [name]: researcherInfo[name] });
    //   setErrors((prev) => ({ ...prev, [name]: undefined }));
    // } catch (err) {
    //   setErrors((prev) => ({ ...prev, [name]: err.message }));
    // }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchAddProduct(program);
      console.log('Product added successfully!');
      if (response)setIsSubmitted(true);

    } catch (err) {
      console.log('Product added error!');
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    if (isSubmitted === true) {
      navigate('/Loopholes')
    }
  }, [isSubmitted, navigate])
  return (
    <div style={{ zIndex: 2 }}>
      <Flex
        direction="column"
        justify="center"
        align="center"
        h={400}
        w={456}
        m="auto"
        mt={70}
        style={{
          borderRadius: 8,
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        }}
      >
        <Title size="24" lh={2}>
          Add New Program
        </Title>
        <Text c="#9CA3AF" lh={1} fs={32} fw={500} mb={30}>
          Please Fill In The Required Fields To Add The Program
        </Text>
        <Flex direction={"column"}>
          <TextInput
            w={318}
            h={50}
            required
            placeholder="Program Name*"
            rightSection={<MdPadding />}
            name="title"
            value={program.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextInput
            w={318}
            h={50}
            mb={16}
            required
            placeholder="Enter Program URL*"
            rightSection={<CiGlobe />}
            name="url"
            value={program.url}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Textarea w={318}
            h={50} placeholder="Input placeholder*" name='description' onChange={handleChange} value={program.description} required />
        </Flex>
        <Flex mt={24} gap={8}>
          <Button
            radius={8}
            w={155}
            variant="outline"
            color={primaryColor}
            onClick={() => {
              navigate("/Loopholes");
            }}
          >
            Cancle
          </Button>
          <Button
            radius={8}
            w={155}
            variant="filled"
            color={primaryColor}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
