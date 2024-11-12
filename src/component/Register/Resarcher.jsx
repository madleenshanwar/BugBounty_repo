import React, { useContext, useEffect, useState } from 'react'
import { Flex, Checkbox, Button, Text, Modal, Title } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { ModeContext } from '../../App';
import { TextInput } from '@mantine/core';
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { IoEyeOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import * as Yup from 'yup';
import { useDisclosure } from '@mantine/hooks';
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useTranslation } from 'react-i18next';
import { RegisterResearcher } from '../../Api/researcher/Auth/Register';
import { submitCode } from '../../Api/researcher/Auth/AddCode';


const validationSchemaResarcher = Yup.object().shape({
  name: Yup.string()
    .required("name is required")
    .min(3),
  password: Yup.string()
    .required('password is required')
    .min(8)
    .matches(/[a-zA-Z]/, 'must contain letters')
    .matches(/[0-9]/, 'must contain numbers'),
  email: Yup.string()
    .email("email is invalid")
    .required("email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'phone must be 10 numbers')
    .required('phone is required'),

});

export default function Resarcher() {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { primaryColor } = useContext(ModeContext)
  const { color } = useContext(ModeContext)
  const [checked, setChecked] = useState(false);
  const [activeFieldId, setActiveFieldId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [researcherInfo, setResearcherInfo] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })
  const [code, setCode] = useState('');
  const [uuid, setUuid] = useState('');
  const [modalOpened, setModalOpened] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResearcherInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = async (e) => {
    const { name } = e.target;
    try {
      await validationSchemaResarcher.validateAt(name, { [name]: researcherInfo[name] });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  //Sign Up Button
  const handleSignUp = async (e) => {
    e.preventDefault();
    const values = { ...researcherInfo };

    try {
      await validationSchemaResarcher.validate(values, { abortEarly: false });
      setErrors({});
      //API
      const response = await RegisterResearcher(researcherInfo);
      if (response) {
        console.log(response.data.researcher)
        setUuid(response.data.researcher.uuid)
        // setResearcherInfo(response.data.researcher);
        setModalOpened(true);
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  //Update id State
  useEffect(() => {
    if (researcherInfo) {
      console.log('Updated UUID:', researcherInfo);
    }
  }, [researcherInfo]);

  //Code Button
  const handleSubmitCode = async () => {
    if (!uuid) {
      console.error('UUID is missing, cannot submit code.');
      return;
    }
    try {
      console.log('Submitting code with UUID:', researcherInfo);
      const response = await submitCode(uuid,code);
      if (response) {
        setModalOpened(false);
        console.log('Code submitted successfully:', response);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting code:', error);
      setIsSubmitted(false);
    }
  };


  console.log(isSubmitted)
  useEffect(() => {
    if (isSubmitted === true) {
      navigate('/')
    }
  }, [isSubmitted, navigate]
  )
  //handle change language
  const { t } = useTranslation();
  return (
    <div>
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)} centered>
        <Flex columnGap={16} rowGap={16} mt={24} wrap='wrap' justify='center'>
          <Title size="24" lh={1}>
            {t("please enter register code")}
          </Title>
          <Text c="#9CA3AF" lh={1} fs={16} fw={700}>
            {t("the registration code consists of 8 digits containing numbers and letters")}
          </Text>
          <TextInput w={318} h={50} mb={16} required placeholder={t("enter your register code")} rightSection={<HiArrowLeftOnRectangle color='#9CA3AF' />} value={code} onChange={(e)=>{setCode(e.target.value)}}
            onBlur={handleBlur} /></Flex>
        <Flex gap={16} align='center' justify='center'>
          <Button w={151} variant="outline" color={primaryColor}
            onClick={close}>{t("back")}</Button>
          <Button w={151} variant="filled" color={primaryColor} onClick={handleSubmitCode} >{t("continue")}</Button>
        </Flex>
      </Modal>

      <Flex columnGap={16} rowGap={8} mt={24} wrap='wrap' justify='center'>
        <TextInput w={318} h={50} required placeholder={t("enter your email")} rightSection={<MdOutlineEmail color='#9CA3AF' />} name="email" value={researcherInfo.email} onChange={handleChange}
          error={errors.email} onBlur={handleBlur} />
        <TextInput w={318} h={50} required placeholder={t("enter your name")} rightSection={<IoPersonOutline color='#9CA3AF' />} name="name" value={researcherInfo.name} onChange={handleChange}
          error={errors.name} onBlur={handleBlur} />
        <TextInput w={318} h={50} required placeholder={t("enter your phone number")} rightSection={<LuPhone color='#9CA3AF' />} name="phone" value={researcherInfo.phone} onChange={handleChange}
          error={errors.phone} onBlur={handleBlur} />
        <TextInput w={318} h={50} required placeholder={t("enter your password")} rightSection={<IoEyeOutline color='#9CA3AF' />} onChange={handleChange} name="password" value={researcherInfo.password}
          error={errors.password} onBlur={handleBlur} />
      </Flex>
      <Checkbox mb={24} mt={8}
        checked={checked} required c={color} label={t("agree to the privacy and terms of service")} onChange={(event) => setChecked(event.currentTarget.checked)} />
      <Flex gap={16} align='center' justify='center'>
        <Button w={151} variant="filled" color={primaryColor} disabled={!checked} onClick={handleSignUp} >{t("sign up")}</Button>
        <Button w={151} variant="outline" color={primaryColor}
          onClick={() => navigate('/login')}>{t("login")}</Button>
      </Flex>
    </div>
  )
}
