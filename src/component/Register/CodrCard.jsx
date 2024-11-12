import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup';
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { ModeContext } from '../../App'
import { Button, Flex,  Text, TextInput, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//change pass
const validationCode = Yup.object().shape({
    code: Yup.string()
    .matches(/^[0-9]{4}$/, 'code must be 4 numbers')
    .required('code is required'),
  })
export default function CodrCard() {
  const { color } = useContext(ModeContext);
  const { bgColor } = useContext(ModeContext);
    const [login, setLogin] = useState({
        code: '',
    
      })
      const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevR) => ({
          ...prevR,
          [name]: value,
        }));
      }
    
    
      const navigate=useNavigate();
      const [errors, setErrors] = useState({});
      const [isSubmitted, setIsSubmitted] = useState(false);
      const { primaryColor } = useContext(ModeContext);
      const handleBlur = async (e) => {
        const { name } = e.target;
        try {
          await validationCode.validateAt(name, { [name]: login[name] });
          setErrors((prev) => ({ ...prev, [name]: undefined }));
        } catch (err) {
          setErrors((prev) => ({ ...prev, [name]: err.message }));
        }
      };
      const handleSendCode = async (e) => {
        e.preventDefault();
        const values = { ...login };
        try {
          await validationCode.validate(values, { abortEarly: false });
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
      useEffect(() => {
        if (isSubmitted === true) {
          navigate('/resetPass')
        }
      }, [isSubmitted, navigate])
      //handle change language
  const { t } = useTranslation();
  return (
    <div style={{ zIndex: 2}}>
    <Flex direction='column' justify='center' align='center' h={333} w={456} m='auto' mt={70} style={{ borderRadius: 8, backgroundColor: bgColor, boxShadow: '0px 4px 10px rgba(0,0,0,0.25)' }} >
      <Title size="24" lh={2} c={color}>
        {t("enter validate code")}
      </Title>
      <Text c="#9CA3AF" lh={1} fs={32} fw={500} mb={30}>
        {t("please check your email and then enter the 4-digit code")}
      </Text>
      <Flex >
      <TextInput w={318} h={50} mb={8} required placeholder={t('enter register code')} rightSection={<HiArrowLeftOnRectangle color='#9CA3AF' />} id="5" name="code" value={login.code} onChange={handleChange}
        error={errors.code} onBlur={handleBlur} /></Flex>
      <Flex mt={24} gap={8}>
        <Button radius={8} w={155} variant="filled" color={primaryColor} onClick={handleSendCode} >{t("check code")}</Button>
        <Button radius={8} w={155} variant="outline" color={primaryColor} onClick={()=>{navigate('/changePass')}}>{t("back")}</Button>
      </Flex>

    </Flex>
  </div>
  )
}
