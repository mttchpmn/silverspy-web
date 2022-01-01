import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {PageContainer} from "../components/PageContainer";
import {Button, Space} from "antd";
import {useUser} from "@auth0/nextjs-auth0";
import {useRouter} from "next/router";

const Profile = () => {
    const {user, error, isLoading} = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        user ? (
            <div>
                {/*<img src={user.picture} alt={user.name}/>*/}
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        ) : null
    );
}

const Home: NextPage = () => {

    return (
        <div>
            <h1>Silverspy</h1>
            <Profile/>
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
