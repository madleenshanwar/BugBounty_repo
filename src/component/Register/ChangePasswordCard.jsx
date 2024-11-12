import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ModeContext } from '../../App';
import * as Yup from 'yup';
import { MdOutlineEmail } from "react-icons/md";
import { Button, Flex, Text, TextInput, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
//change pass
const validationSchemaLogin = Yup.object().shape({
    
    email: Yup.string()
      .email("email is invalid")
      .required("email is required"),
  
  });
export default function ChangePasswordCard() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { primaryColor } = useContext(ModeContext);
    const { color } = useContext(ModeContext);
    const { bgColor } = useContext(ModeContext);
    const [login, setLogin] = useState({
      email: '',
      password: '',
    })
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setLogin((prevR) => ({
        ...prevR,
        [name]: value,
      }));
    }
  
  
    const handleBlur = async (e) => {
      const { name } = e.target;
      try {
        await validationSchemaLogin.validateAt(name, { [name]: login[name] });
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      } catch (err) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    };
  
  
    const handleSendCode = async (e) => {
      e.preventDefault();
      const values = { ...login };
  
      try {
        await validationSchemaLogin.validate(values, { abortEarly: false });
        setErrors({});
        setIsSubmitted(true);
      } catch (err) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        setIsSubmitted(false);
      }
    };
    console.log(isSubmitted)
    useEffect(() => {
      if (isSubmitted === true) {
        navigate('/code')
      }
    }, [isSubmitted, navigate])
     //handle change language
  const { t } = useTranslation();
  return (
    <div style={{ zIndex: 2}}>
    <Flex direction='column' justify='center' align='center' h={333} w={456} m='auto' mt={70} style={{ borderRadius: 8, backgroundColor: bgColor, boxShadow: '0px 4px 10px rgba(0,0,0,0.25)' }} >
      <Title size="24" lh={2} c={color}>
        {t("reset password")}
      </Title>
      <Text c="#9CA3AF" lh={1} fs={32} fw={500} mb={30}>
        {t("please enter your email to reset password")}
      </Text>
      <Flex direction='column'>
        <TextInput w={318} h={50} mt={8} required placeholder={t('enter your email')} rightSection={<MdOutlineEmail color='#9CA3AF' />} id="1" name="email" value={login.email} onChange={handleChange} 
          error={errors.email} onBlur={handleBlur} />
          
      </Flex>
      <Flex mt={24} gap={8}>
        <Button radius={8} w={155} variant="filled" color={primaryColor} onClick={handleSendCode} >{t("send code")}</Button>
        <Button radius={8} w={155} variant="outline" color={primaryColor} onClick={()=>{navigate('/')}}>{t("back")}</Button>
      </Flex>

    </Flex>
  </div>
  )
}
