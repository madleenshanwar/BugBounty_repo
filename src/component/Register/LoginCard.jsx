import React, { useContext, useEffect, useState } from 'react'
import { Flex, Title, Button, Text, PasswordInput } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { TextInput } from '@mantine/core';
import { MdOutlineEmail } from "react-icons/md";
import { ModeContext } from '../../App';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { LoginCompany } from '../../Api/company/Auth/Login';
/*first page */
const validationSchemaLogin = Yup.object().shape({
  password: Yup.string()
    .required('password is required')
    .min(8, 'must contain at least 8 letters')
    // .matches(/[a-zA-Z]/, 'must contain letters')
    // .matches(/[0-9]/, 'must contain numbers')
    ,
  email: Yup.string()
    .email("email is invalid")
    .required("email is required"),

});

export default function LoginCard() {
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
  //handle change language
  const { t } = useTranslation();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    const values = { ...login };

    try {
      await validationSchemaLogin.validate(values, { abortEarly: false });
      setErrors({});
      // LoginCompany(login);
      const result=await LoginCompany(login);
      console.log('company register',result.data)
      localStorage.setItem('token',result.data.token);
      console.log(result.data.token)
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
  useEffect(() => {
    if (isSubmitted === true) {
      navigate('/homeCompany')
    }
  }, [isSubmitted, navigate])
  //handle with change passowrd
  const handleChangePass=()=>{
    navigate('/changePass');
  }
  return (
    <div style={{ zIndex: 2 }}>
      <Flex direction='column' justify='center' align='center' h={333} w={456} m='auto' mt={10} style={{ borderRadius: 8, backgroundColor: bgColor, boxShadow: '0px 4px 10px rgba(0,0,0,0.25)' }} >
        <Title size="24" lh={2} c={color}>
         {t('welcome')} 
        </Title>
        <Text c="#9CA3AF" lh={1} fs={32} fw={500} mb={30}>
          {t('Please login to continue')}
        </Text>
        <Flex direction='column'>
          <TextInput w={318} h={50} mt={8} required placeholder={t('enter your email')} rightSection={<MdOutlineEmail color='#9CA3AF' />}  name="email" value={login.email} onChange={handleChange} 
            error={errors.email} onBlur={handleBlur} />
          <PasswordInput w={318} h={50} mt={8} required placeholder={t('enter your password')}  onChange={handleChange} name="password" value={login.password} 
            error={errors.password} onBlur={handleBlur}/>
          <Button variant='transparent' color='black' style={{alignSelf:'start',textDecoration:'underline'}} onClick={handleChangePass} c={color}>
            {t('change password')}
          </Button>
        </Flex>
        <Flex mt={24} gap={8}>
          <Button radius={8} w={155} variant="filled" color={primaryColor} onClick={handleLogin}>{t("login")}</Button>
          <Button radius={8} w={155} variant="outline" color={primaryColor} onClick={() => navigate('/signup')} >{t("sign up")}</Button>
        </Flex>

      </Flex>
    </div>
  )
}