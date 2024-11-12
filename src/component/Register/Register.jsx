import React, { useContext, useState } from 'react'
import { Tabs,Flex, Title, Text } from '@mantine/core';
import { ModeContext } from '../../App';
import Resarcher from './Resarcher';
import Company from './Company';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { primaryColor } = useContext(ModeContext);
  const { color } = useContext(ModeContext);
  const { bgColor } = useContext(ModeContext);
  const [activeTab, setActiveTab] = useState('first');
   //handle change language
   const { t } = useTranslation();
  return (
    <div style={{ zIndex: 2 }} >

      <Flex direction='column' align='center' justify='center' p={32} w={796} style={{ borderRadius: 8, backgroundColor: bgColor, boxShadow: '0px 4px 10px rgba(0,0,0,0.25)' }} >
        <Title size="24" lh={2} c={color}>
          {t("welcome")}
        </Title>
        <Text c="#9CA3AF" lh={1} fs={16} fw={700}>
          {t("please register to continue")}
        </Text>

        <Tabs w={652} mt={24} color="#990000" variant="pills" value={activeTab} onChange={setActiveTab}>
          <Tabs.List grow justify="space-between">
            <Tabs.Tab h={40} value="first"><Text fs='24' fw={700}>{t("register as a security researcher")}</Text> </Tabs.Tab>
            <Tabs.Tab h={40} value="second"><Text fs='24' fw={700} >{t("register as a new company")}</Text> </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="first">
            <Resarcher />
          </Tabs.Panel>
          <Tabs.Panel value="second">
            <Company />
          </Tabs.Panel>
        </Tabs>

      </Flex>

    </div>
  )
}
