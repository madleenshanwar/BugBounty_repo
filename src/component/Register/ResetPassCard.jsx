import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { ModeContext } from "../../App";
import { Button, Flex, PasswordInput, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

const validationCode = Yup.object().shape({
  confirmPass: Yup.string()
    .required("password is required")
    .min(8, "must contain at least 8 letters")
    .matches(/[a-zA-Z]/, "must contain letters")
    .matches(/[0-9]/, "must contain numbers"),
  newPass: Yup.string()
    .required("password is required")
    .min(8, "must contain at least 8 letters")
    .matches(/[a-zA-Z]/, "must contain letters")
    .matches(/[0-9]/, "must contain numbers"),
});
export default function ResetPassCard() {
  const [login, setLogin] = useState({
    confirmPass: "",
    newPass: "",
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
  const { color } = useContext(ModeContext);
  const { bgColor } = useContext(ModeContext);
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
      navigate("/");
    }
  }, [isSubmitted, navigate]);
      //handle change language
      const { t } = useTranslation();
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
          backgroundColor:bgColor,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        }}
      >
        <Title size="24" lh={2} c={color}>
          {t("change password")}
        </Title>
        <Text c="#9CA3AF" lh={1} fs={32} fw={500} mb={30}>
          {t("please reset your password")}
        </Text>
        <Flex direction={"column"}>

          <PasswordInput
            w={318}
            h={50}
            mt={8}
            required
            placeholder={t("enter your new password")}
            onChange={handleChange}
            name="newPass"
            value={login.newPass}
            error={errors.newPass}
            onBlur={handleBlur}
          />
          <PasswordInput
            w={318}
            h={50}
            mt={8}
            required
            placeholder={t("confirm password")}
            onChange={handleChange}
            name="confirmPass"
            value={login.confirmPass}
            error={errors.confirmPass}
            onBlur={handleBlur}
          />
        </Flex>
        <Flex mt={24} gap={8}>
          <Button
            radius={8}
            w={155}
            variant="filled"
            color={primaryColor}
            onClick={handleSendCode}
          >
            {t("save change")}
          </Button>
          <Button
            radius={8}
            w={155}
            variant="outline"
            color={primaryColor}
            onClick={() => {
              navigate("/code");
            }}
          >
            {t("back")}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
