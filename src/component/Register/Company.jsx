import React, { useContext, useEffect, useState } from 'react'
import { Flex, Checkbox, Button, Select, Modal, Title, Text } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { ModeContext } from '../../App';
import { TextInput } from '@mantine/core';
import { MdOutlineEmail } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { GoGlobe } from "react-icons/go";
import { LiaUserFriendsSolid } from "react-icons/lia";
import * as Yup from 'yup';
import { useDisclosure } from '@mantine/hooks';
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useTranslation } from 'react-i18next';
import { RegisterCompany } from '../../Api/company/Auth/Register';

const validationSchemaCompany = Yup.object().shape({
  name: Yup.string()
    .required("name is required")
    .min(3, 'Name must have at least 3 letters')
    .max(30,"Name must have at most 30 letters"),
  domain: Yup.string()
    .required("domain is required")
    .matches(/[^https?:\/\/]/,"domain must start with a https://")
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


export default function Company() {
  const navigate = useNavigate();
  const { primaryColor } = useContext(ModeContext)
  const { color } = useContext(ModeContext);
  const {setHow}=useContext(ModeContext)
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    domain: '',
    employess_count: '',
    type: '',
    password: '',
    email: '',

  })
  const[success,setSuccess]=useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCompanyInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(companyInfo)
  };
  const handleChangeType=(name,value)=>{
   setCompanyInfo((prevData)=>({
    ...prevData,
    [name]:value
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

  const handleContinue = async (e) => {
    e.preventDefault();
    const values = { ...companyInfo };

    try {
      await validationSchemaCompany.validate(values, { abortEarly: false });
      setErrors({});
      const result=await RegisterCompany(companyInfo);
      console.log('company register',result)
      if(result){
        setIsSubmitted(true);
        setSuccess(false)
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    if (isSubmitted === true) {
      navigate('/home')
    }
  }, [isSubmitted, navigate]
  )
  //handle change language
  const { t } = useTranslation();
  return (
    <div>
      <>
      {!success?(
        <>
        <Flex columnGap={16} rowGap={8} mt={24} wrap='wrap' justify='center'>
        <TextInput w={318} h={50} required placeholder={t("enter company name")} rightSection={<IoPersonOutline color='#9CA3AF' />} name="name" value={companyInfo.name} onChange={handleChange} 
          onBlur={handleBlur} error={errors.name} />
        <TextInput w={318} h={50} required placeholder={t("enter company domain")} rightSection={<GoGlobe color='#9CA3AF' />}  name="domain" value={companyInfo.domain} onChange={handleChange} 
          onBlur={handleBlur} error={errors.domain} />
        <Select w={318} h={50} onChange={(value)=>handleChangeType('type',value)} 
          placeholder={t("enter company type")} data={["حكومية","عامة","مشتركة"]} name='type' value={companyInfo.type}
          onBlur={handleBlur} error={errors.type} />
        <TextInput w={318} h={50} required placeholder={t("enter numbers of employees")} rightSection={<LiaUserFriendsSolid color='#9CA3AF' />}  name="employess_count" value={companyInfo.employess_count} onChange={handleChange} 
          onBlur={handleBlur} error={errors.employess_count} />
        <TextInput w={318} h={50} required placeholder={t("enter company email")} rightSection={<MdOutlineEmail color='#9CA3AF' />}  name="email" value={companyInfo.email} onChange={handleChange} 
          onBlur={handleBlur} error={errors.email} />
        <TextInput w={318} h={50} required placeholder={t("enter your password")} rightSection={<IoEyeOutline color='#9CA3AF' />}  name="password" value={companyInfo.password} onChange={handleChange} 
          onBlur={handleBlur} error={errors.password} />
      </Flex>
      <Checkbox mb={24} mt={8}
      checked={checked} required color={primaryColor} label="Agree to the Privacy and Terms of Service." onChange={(event) => setChecked(event.currentTarget.checked)} />
    <Flex gap={16} align='center' justify='center'>
      <Button w={151} variant="outline" color={primaryColor}
        onClick={() => navigate('/login')}>Login</Button>
      <Button w={151} variant="filled" color={primaryColor} disabled={!checked} onClick={handleContinue} >Sign up</Button>
    </Flex>
        </>
    ):<Flex direction={'column'} align={'center'} gap={16} mt={32}>
      <Text c={'#219549'} fw={'600'} size={"40px"}>success!</Text>
      <Button w={151}  variant="filled" color={primaryColor}
          onClick={() => navigate('/login')}>{t("login")}</Button>
      </Flex>}
      </>
    </div>
  )
}
