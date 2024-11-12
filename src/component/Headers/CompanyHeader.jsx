import React, { useContext, useState} from "react";
import { Box } from "@mantine/core";
import { Button } from "@mantine/core";
import { Image } from "@mantine/core";
import {  Flex } from "@mantine/core";
import { LiaBell } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "../../App";
import { useTranslation } from "react-i18next";
import i18n from '../../i18n'

export default function CompanyHeader() {
  const { primaryColor } = useContext(ModeContext);
  const navigate = useNavigate();

  //Mode
  const { dark } = useContext(ModeContext);
  const { setDark } = useContext(ModeContext);
  const handleDark = () => {
    console.log(dark);
    setDark(!dark);
    localStorage.setItem('dark',!dark)
  };

  //Translate
  const { en } = useContext(ModeContext);
  const { setEn} = useContext(ModeContext);
  let body=document.querySelector('body');
  if(en){
    body.classList.add('changeLanguage');
  }
  else body.classList.remove('changeLanguage');
  const {t}=useTranslation();
  const changeLanguage = (lng) => {
    setEn(!en);
    i18n.changeLanguage(lng);
}
  return (
    <div>
      <Box
        px={64}
        h={80}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.20)",
        }}
      >
        <Image radius="md" h={48} w={131} src="\assets\images\Vector.png" />
        <Flex align="center" justify="space-between">
          <Button
            onClick={() => {
              navigate("/homeCompany");
            }}
            variant="transparent"
            style={{ color: primaryColor, fontSize: "20px", fontWeight: 700 }}
            className="homebutton" 
          >
            {t('home')}
          </Button>

          <Button
            className="homebutton"
            variant="transparent"
            style={{ color: primaryColor, fontSize: "20px", fontWeight: 700 }}
            onClick={() => {
              navigate("/CompanyTable");
            }}
          >
            {t('loopholes')}
          </Button>

          <Image
            src="/assets/images/Drrebni.png"
            radius="xl"
            w={"40"}
            h={40}
            onClick={() => {
              navigate("/CompanyProfil");
            }}
            className="cursor"
          />
          <Button variant="transparent" color={primaryColor}>
            <LiaBell size="28" />
          </Button>
          {dark ? (
            <Button
              variant="transparent"
              color={primaryColor}
              onClick={handleDark}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke={primaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-moon"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
              </svg>
            </Button>
          ) : (
            <Button
              variant="transparent"
              color={primaryColor}
              onClick={handleDark}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke={primaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-sun"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
              </svg>
            </Button>
          )}
          {en?
             <Button variant="transparent" onClick={()=>changeLanguage('en')}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 64 64"><path fill="#e6e7e8" d="M0 25h64v14H0z"/><path fill="#ec1c24" d="M54 10H10C3.373 10 0 14.925 0 21v4h64v-4c0-6.075-3.373-11-10-11"/><path fill="#25333a" d="M0 43c0 6.075 3.373 11 10 11h44c6.627 0 10-4.925 10-11v-4H0z"/><path fill="#137a08" d="m15.734 26.342l1.768 3.583l3.957.579l-2.862 2.796l.676 3.93l-3.539-1.86l-3.54 1.86l.678-3.93l-2.862-2.796l3.958-.579zm32.213 0l1.768 3.583l3.958.579L50.81 33.3l.68 3.93l-3.543-1.86l-3.537 1.86l.68-3.93l-2.87-2.796l3.96-.579z"/></svg></Button>
            :
            <Button variant="transparent" onClick={()=>changeLanguage('ar')}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 36"><path fill="#bf0a30" d="M35.692 28.538H.308A4 4 0 0 0 4 31h28a4 4 0 0 0 3.692-2.462M0 23.811h36v2.561H0zM11.5 9.629H36v2.561H11.5zm24.192-2.167A4 4 0 0 0 32 5H11.5v2.462zM11.5 14.356H36v2.561H11.5zM0 19.083h36v2.561H0z"/><path fill="#eee" d="M11.5 12.189H36v2.167H11.5zM0 16.917v2.166h36v-2.166H12zm11.5-9.455v2.167H36V9c0-.545-.111-1.064-.308-1.538zM0 21.644h36v2.167H0zM0 27c0 .545.111 1.064.308 1.538h35.383A4 4 0 0 0 36 27v-.629H0z"/><path fill="#002868" d="M4 5a4 4 0 0 0-4 4v7.917h12V5z"/><path fill="#fff" d="M6.794 10.245L6 7.802l-.794 2.443H2.638l2.078 1.51l-.794 2.443L6 12.688l2.078 1.51l-.794-2.443l2.078-1.51z"/></svg></Button>
            }
          
        </Flex>
      </Box>
    </div>
  );
}
