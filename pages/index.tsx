import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {PageContainer} from "../components/PageContainer";
import {Button, Carousel, Layout, Space, Typography} from "antd";
import {useUser} from "@auth0/nextjs-auth0";
import {useRouter} from "next/router";
import {LoginOutlined} from "@ant-design/icons";

const {Header, Content, Footer} = Layout;
const {Title, Text} = Typography;

const Home: NextPage = () => {

    const contentStyle = {
        height: '400px',
        color: '#fff',
        lineHeight: '400px',
        textAlign: 'center',
        background: '#364d79',
    };

    const router = useRouter();

    const {user, isLoading, error} = useUser();

    if (isLoading) return <div>Loading...</div>
    if (user) router.push("/dashboard")

    return (
        <Layout>
            <Header>
               <Space style={{width: "100%", justifyContent: "space-between"}}>
                   <div>
                       <Title level={1} style={{color: "white"}}>Silverspy</Title>
                   </div>
                   <Space>
                       <Button icon={<LoginOutlined />} onClick={() => router.push("/api/auth/login")}>Log In</Button>
                   </Space>
               </Space>
            </Header>
            <Content style={{backgroundColor: "white"}}>
                <Carousel>
                    <div>
                        <h3 style={contentStyle}>Keep an eye on what your finances are up to</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>Plan for your future</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>Get away from living paycheck to paycheck</h3>
                    </div>
                </Carousel>
                <Space style={{width: "100%", justifyContent: "center"}}>
                    <Space direction={"vertical"}>
                    </Space>
                </Space>

            </Content>
            <Footer style={{backgroundColor: "#f0f2f5"}}>
                <Space style={{width: "100%", justifyContent: "center"}}>
                    Copyright Silverspy 2022
                </Space>
            </Footer>
        </Layout>
    )
}

export default Home
