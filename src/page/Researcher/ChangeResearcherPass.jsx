import React from 'react'
import ResearcherHeader from '../../component/Headers/ResearcherHeader'
import ChangeResercherPassCard from '../../component/Reseacher/ChangeResearcherpassCard'
import { Flex } from '@mantine/core'
import Footer from '../../component/Footer/Footer'

export default function ChangeResercherPass() {
    return (
        <div>
            <ResearcherHeader />
            <Flex justify='center'>
                <ChangeResercherPassCard />
            </Flex>
            <Footer />
        </div>
    )
}
