import { Avatar, Box, Button,  Flex, Modal, Textarea, TextInput,Text, BackgroundImage } from '@mantine/core';
import React, { useContext ,useEffect, useState} from 'react'
import { IoExitOutline, IoPersonOutline } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { ModeContext } from '../../App';
import { MdOutlineEmail } from 'react-icons/md';
import { LuPhone } from 'react-icons/lu';
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';
import { LiaEdit } from 'react-icons/lia';
import { useDisclosure } from '@mantine/hooks';
import { FetchProfile } from '../../Api/researcher/profile/FetchProfile';
import { UpdateProfile } from '../../Api/researcher/profile/UpdateProfile';
import * as Yup from 'yup';
import { LogOut } from '../../Api/researcher/Auth/LogOut';
const validationSchema= Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .min(3, 'Name must have at least 3 letters')
      .max(30, "Name must have at most 30 letters")
    ,
    email: Yup.string()
      .email("email is invalid")
      .required("cemail is required")
  });
export default function () {
    const navigate = useNavigate()
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const { primaryColor } = useContext(ModeContext)
    const [opened, { open, close }] = useDisclosure(false);
    const { index } = useParams();
    const [researcher,setResearcher]=useState({
        uuid:'',
        name:'',
        email:'',
        image:'',
        phone:" ",
        code:" ",
        description:'',
    })
    useEffect(()=>{
        const fetch=async()=>{
            try{
                setResearcher( await FetchProfile());
            }
            catch (error){
                console.log(error)            }
        }
            fetch();
    },[])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResearcher((prev)=>({
             ...prev,
            [name]: value 
        }));
        console.log(researcher)
    };
    const handleBlur = async (e) => {
        const { name } = e.target;
        try {
          await validationSchema.validateAt(name, { [name]: companyInfo[name] });
          setErrors((prev) => ({ ...prev, [name]: undefined }));
        } catch (err) {
          setErrors((prev) => ({ ...prev, [name]: err.message }));
        }
      };
    
      const handleSaveChange = async (e) => {
        e.preventDefault();
        const values = { ...researcher };
    
        try {
          await validationSchema.validate(values, { abortEarly: false });
          setErrors({});console.log('info update', values)
            //  update api
          const result=await UpdateProfile(researcher);
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
    const handleChangePass=()=>{
        navigate('/changePassword');
      }
     //logOut
  const handleLogOut =async () => {
    try {
      const result=await LogOut();
      if (result) navigate('/') ;;
    } catch (err) {
       console.log(err)
      };
   
  }
    return (
        <div>
            <Flex direction='column' justify='center' align='center' my={40} rowGap={24}>
                <Flex direction='column' align='end' w={668} >
                    <Flex justify='space-between' w={380} >
                        <Flex >
                            <Avatar w={100} h={100} src="\assets\images\profile.png" alt="no image here" />
                            <LiaEdit color={primaryColor} size={24} style={{ position: 'absolute', right: 630 }} />
                        </Flex>
                        <Box w={25} h={25} style={{ borderRadius: 100, backgroundColor: { primaryColor } }}>
                            <Button variant='transparent' onClick={open} ><IoExitOutline color={primaryColor} size={30} /></Button>
                        </Box>
                    </Flex>
                    <Flex w={668} columnGap={16} rowGap={8} mt={24} wrap='wrap' justify='center'>
                        <TextInput w={318} h={50} value={researcher.name} required placeholder="Enter your name" rightSection={<IoPersonOutline color='#9CA3AF' />} name="name" onChange={handleChange}
                            onBlur={handleBlur} />
                        <TextInput w={318} h={50} value={researcher.email} required placeholder="Enter your email" rightSection={<MdOutlineEmail color='#9CA3AF' />} name="email" onChange={handleChange}
                            onBlur={handleBlur} />
                        <TextInput w={318} h={50} value={researcher.phone} required placeholder="Enter your phone number" rightSection={<LuPhone color='#9CA3AF' />} name="phone" onChange={handleChange}
                            onBlur={handleBlur} />
                        <TextInput w={318} h={50} mb={16} value={researcher.code} required placeholder="Enter your register code" rightSection={<HiArrowLeftOnRectangle color='#9CA3AF' />} name="code" onChange={handleChange}
                            onBlur={handleBlur} />
                        <Textarea w={652} placeholder="Input placeholder" name="description" onChange={handleChange} value={researcher.description||""} />
                    </Flex>
                    <Button variant='transparent' color='black' style={{alignSelf:'start',textDecoration:'underline'}} onClick={handleChangePass}>
            Change Password
          </Button>
                </Flex>
                <Button radius={8} w={151} variant="filled" color={primaryColor} onClick={handleSaveChange}>Save changes</Button>
            </Flex>

            <Modal radius={16} opened={opened} onClose={close} centered>

            <BackgroundImage src="/assets/images/bg.png">
                <Flex direction='column' align='center' gap={32}  >
          <Text  lh={1} fs={28} fw={700}>
            Do you want to Logout?
          </Text>
        <Flex gap={16} mb={40} align='center' justify='center'>
        <Button w={151}  variant="outline" color={primaryColor}
            onClick={close}>Cancel</Button>
          <Button w={151} variant="filled" color={primaryColor} onClick={handleLogOut} >Logout</Button>
        </Flex>
        </Flex>
        </BackgroundImage>

      </Modal>

        </div>
    )
}
