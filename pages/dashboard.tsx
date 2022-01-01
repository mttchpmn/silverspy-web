import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {PageContainer} from "../components/PageContainer";

const Home: NextPage = () => {
    return (
        <PageContainer title={"Dashboard"}>
            Dashboard page
        </PageContainer>
    )
}

export default Home
