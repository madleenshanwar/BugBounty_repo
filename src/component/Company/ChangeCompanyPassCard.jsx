import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { ModeContext } from "../../App";
import { Button, Flex, PasswordInput, Text, Title } from "@mantine/core";
import { fetchPassword } from "../../Api/company/profile/ChangePassword";

const validationCode = Yup.object().shape({
  old_password:Yup.string()
    .required("password is required")
    .min(8, "must contain at least 8 letters")
   
    .matches(/[0-9]/, "must contain numbers"),
    new_password_confirmation: Yup.string()
      .required("password is required")
      .min(8, "must contain at least 8 letters")
     
      .matches(/[0-9]/, "must contain numbers"),
      new_password: Yup.string()
      .required("password is required")
      .min(8, "must contain at least 8 letters")
    
      .matches(/[0-9]/, "must contain numbers"),
  });
export default function ChangeCompanyPassCard() {
  
    const [login, setLogin] = useState({
      old_password:'',
      new_password: "",
      new_password_confirmation: "",
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevR) => ({
          ...prevR,
          [name]: value,
        }));
      };
    
      const navigate = useNavigate();
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
      const handleSaveChange = async (e) => {
        e.preventDefault();
        const values = { ...login };
        try {
          const result=await fetchPassword(login);
          await validationCode.validate(values, { abortEarly: false });
          setErrors({});
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
          navigate("/CompanyProfil");
        }
      }, [isSubmitted, navigate]);
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
        Enter Validate Code
      </Title>
      <Text c="#9CA3AF" lh={1} fs={32} fw={500} mb={30}>
        Please Check Your Email And Enter The Validate Code
      </Text>
      <Flex direction={"column"}>
      <PasswordInput
          w={318}
          h={50}
          mt={8}
          required
          placeholder="Enter your Old password"
          onChange={handleChange}
          name="old_password"
          value={login.old_password}
          error={errors.old_password}
          onBlur={handleBlur}
        />
        <PasswordInput
          w={318}
          h={50}
          mt={8}
          required
          placeholder="Enter your new password"
          onChange={handleChange}
          name="new_password"
          value={login.new_password}
          error={errors.new_password}
          onBlur={handleBlur}
        />
        <PasswordInput
          w={318}
          h={50}
          mt={8}
          required
          placeholder="Confirm your newpassword"
          onChange={handleChange}
          name="new_password_confirmation"
          value={login.new_password_confirmation}
          error={errors.new_password_confirmation}
          onBlur={handleBlur}
        />
      </Flex>
      <Flex mt={24} gap={8}>
        <Button
          radius={8}
          w={155}
          variant="outline"
          color={primaryColor}
          onClick={() => {
            navigate("/CompanyProfil");
          }}
        >
          Back
        </Button>
        <Button
          radius={8}
          w={155}
          variant="filled"
          color={primaryColor}
          onClick={handleSaveChange}
        >
          Save Change
        </Button>
      </Flex>
    </Flex>
  </div>
  )
}
