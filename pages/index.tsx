import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {PageContainer} from "../components/PageContainer";
import {Button, Space} from "antd";
import {useUser} from "@auth0/nextjs-auth0";
import {useRouter} from "next/router";



const Home: NextPage = () => {

    return (
        <div>
            <h1>Silverspy</h1>
            <Space>
                <Button>
                    <a href={"/api/auth/login"}>Log in</a>
                </Button>
                <Button>
                    <a href={"/api/auth/logout"}>Log Out</a>
                </Button>
            </Space>
        </div>
    )
}

export default Home
