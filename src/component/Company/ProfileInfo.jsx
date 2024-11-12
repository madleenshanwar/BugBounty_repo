import { Avatar, BackgroundImage, Button, Flex, Modal, Select, Text, Textarea, TextInput } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { IoExitOutline, IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "../../App";
import { MdOutlineEmail } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { CiGlobe } from "react-icons/ci";
import { useDisclosure } from "@mantine/hooks";
import { Logout } from "../../Api/company/Auth/Logout";
import * as Yup from 'yup';
import { fetchUpadteProduct } from "../../Api/company/profile/UpadateProfile";
import { fetchProfile } from "../../Api/company/profile/Profile";

const validationSchemaCompany = Yup.object().shape({
  name: Yup.string()
    .required("name is required")
    .min(3, 'Name must have at least 3 letters')
    .max(30, "Name must have at most 30 letters"),
  domain: Yup.string()
    .required("domain is required")
    .matches(/[^https?:\/\/]/, "domain must start with a https://")
  // .matches(/[[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:[0-9]{1,5})?(\/.*)?$]/,"kjgfuy")
  ,
  employess_count: Yup.string()
    .matches(/^[0-9]/, "must be number")
    .required("email is required"),
  type: Yup.string()
    .required("type is required"),
  password: Yup.string()
    .required('password is required')
    .min(8, 'must contain at least 8 letters')
    .matches(/[a-zA-Z]/, 'must contain letters')
    .matches(/[0-9]/, 'must contain numbers'),
  email: Yup.string()
    .email("email is invalid")
    .required("cemail is required")
});


export default function ProfileInfo() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { primaryColor } = useContext(ModeContext);
  const token = localStorage.getItem('token');
  console.log('token:', token)
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    type: '',
    description: '',
    logo: '',
    domain: '',
    employess_count: '',
  })
  useEffect(() => {
    const fetchData = async () => {
      try{
        setCompanyInfo(await fetchProfile());
    }
    catch (error){
        console.log(error)            }
}
    fetchData();
  }, []);

  console.log(companyInfo)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeType = (name, value) => {
    setCompanyInfo((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleBlur = async (e) => {
    const { name } = e.target;
    try {
      await validationSchemaCompany.validateAt(name, { [name]: companyInfo[name] });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleSaveChange = async (e) => {
    e.preventDefault();
    const values = { ...companyInfo };

    try {
      await validationSchemaCompany.validate(values, { abortEarly: false });
      setErrors({});console.log('info update', companyInfo)
         // update api
      const result=await fetchUpadteProduct(companyInfo);
      if (result)setIsSubmitted(true);
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      setIsSubmitted(false);
    }
  };  

  const handleChangePass = () => {
    navigate('/changePasswordCompany');
  }
  const handleProgram = () => {
    navigate('/Loopholes')
  }
  //logOut
  const handleLogOut = () => {
    Logout()
    navigate('/') ;
  }
  return (
    <div>
      <Flex direction="column" justify="center" align="center" rowGap={24}>
        <Flex direction="column" align="end" w={668} mt={24}>
          <Flex justify="space-between" w={380}>
            <Avatar
              w={100}
              h={100}
              name="logo"
              // value={companyInfo.logo}
              src="\assets\images\Drrebni.png"
              alt="no image here"
            />
            <Button
              variant="transparent"
              onClick={open}
            >
              <IoExitOutline color={primaryColor} size={30} />
            </Button>
          </Flex>
          <Flex
            w={668}
            columnGap={16}
            rowGap={8}
            mt={24}
            wrap="wrap"
          // justify="center"
          >
            <TextInput
              w={318}
              h={50}
              required
              placeholder="Enter Company name"
              rightSection={<IoPersonOutline color="#9CA3AF" />}
              name="name"
              onChange={handleChange}
              value={companyInfo.name}
              onBlur={handleBlur}
              error={errors.name}
            />
            <TextInput
              w={318}
              h={50}
              required
              placeholder="Enter Program URL"
              rightSection={<CiGlobe />}
              name="domain"
              onChange={handleChange}
              value={companyInfo.domain}
              onBlur={handleBlur}
              error={errors.domain}
            />
            <Select
              w={318}
              h={50}
              placeholder="enter company type"
              value={companyInfo.type}
              data={["حكومية", "عامة", "مشتركة"]}
              name='type'
              onChange={(value) => handleChangeType('type', value)}
              onBlur={handleBlur}
              error={errors.type}
            />
            <TextInput
              w={318}
              h={50}
              required
              placeholder="Enter Number Of Company Employees"
              rightSection={<LuUsers2 />}
              name="employess_count"
              onChange={handleChange}
              value={companyInfo.employess_count}
              onBlur={handleBlur}
              error={errors.employess_count}
            />
            <TextInput
              w={318}
              h={50}
              required
              placeholder="Enter Company email"
              rightSection={<MdOutlineEmail color="#9CA3AF" />}
              name="email"
              onChange={handleChange}
              value={companyInfo.email}
              onBlur={handleBlur}
              error={errors.email}
            />
            <Textarea w={652} placeholder="Input placeholder" name="description" onChange={handleChange} value={companyInfo.description||""} />
          </Flex>
          <Button variant='transparent' color='black' style={{ alignSelf: 'start', textDecoration: 'underline' }} onClick={handleChangePass}>
            Change Password
          </Button>
        </Flex>
        <Flex gap={10}>
          <Button radius={8} w={171} variant="outline" color={primaryColor} onClick={handleProgram}>
            Add/Delete Program
          </Button>
          <Button radius={8} w={171} variant="filled" color={primaryColor} onClick={handleSaveChange}>
            Save changes
          </Button>
        </Flex>
      </Flex>
      <Modal radius={16} opened={opened} onClose={close} centered>

        <BackgroundImage src="/assets/images/bg.png">
          <Flex direction='column' align='center' gap={32}  >
            <Text lh={1} fs={28} fw={700}>
              Do you want to Logout?
            </Text>
            <Flex gap={16} mb={40} align='center' justify='center'>
              <Button w={151} variant="outline" color={primaryColor}
                onClick={close}>Cancel</Button>
              <Button w={151} variant="filled" color={primaryColor} onClick={handleLogOut} >Logout</Button>
            </Flex>
          </Flex>
        </BackgroundImage>

      </Modal>
    </div>
  );
}
