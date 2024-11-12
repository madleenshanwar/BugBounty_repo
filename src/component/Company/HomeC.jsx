import { Card, Divider, Flex, Text, Box } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import CardStatistics from './CardStatistics';
import { DonutChart } from '@mantine/charts';
import { PieChart } from '@mantine/charts';
import { fetchHome } from '../../Api/company/HomePage';

export default function HomeC() {
    const [researchers, setResearchers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // const data = await fetchHome();
            setResearchers(await fetchHome());
        };

        fetchData();
    }, []);
    return (
        <div>
            <Flex mx={60} justify='space-between'>
                <Card shadow="sm" padding="lg" radius="md" withBorder w={300} h={300}
                    my={40} mx={30}
                    style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.20)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Text size="18" fw={600} lh={1}> Loopholes Statistics </Text>
                    <Text size="14" lh={1} mt={10}
                        style={{ color: "#9CA3AF" }}
                    > 50 Loopholes </Text>
                    <Divider mt={10} />
                    <DonutChart w={381} h={381} data={data} startAngle={180} endAngle={0} style={{ alignSelf: 'center' }} />
                </Card>


                <Card shadow="sm" padding="lg" radius="md" withBorder w={300} h={300}
                    my={40} mx={30}
                    style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.20)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Text size="18" fw={600} lh={1}> Loopholes Statistics </Text>
                    <Text size="14" lh={1} mt={10}
                        style={{ color: "#9CA3AF" }}
                    > 50 Loopholes </Text>
                    <Divider mt={10} />
                </Card>

                <Card shadow="sm" padding="lg" radius="md" withBorder w={300} h={300}
                    my={40} mx={30}
                    style={{ boxShadow: '0px 4px 10px rgba(0,0,0,0.20)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Text size="18" fw={600} lh={1}> Loopholes Statistics </Text>
                    <Text size="14" lh={1} mt={10}
                        style={{ color: "#9CA3AF" }}
                    > 50 Loopholes </Text>
                    <Divider mt={10} />
                    <DonutChart data={data} style={{ alignSelf: 'center' }} />
                </Card>
            </Flex>

            <Box mt={32} >
                <Text size="24" mb={16} fw={600} lh={2} mx={550}>  Security Researchers </Text>
                <Flex wrap='wrap' gap={16} justify='center' mb={80}>
                    {researchers.map((researcher) => {
                        return <CardStatistics researcher={researcher} />
                    })}

                </Flex>
            </Box>
        </div>
    )
}
