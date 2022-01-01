import React, {useState} from 'react';
import {Layout, Menu, Breadcrumb, Typography, Divider, PageHeader, Button} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    AreaChartOutlined, BankOutlined, DollarOutlined, SettingOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import {useRouter} from "next/router";

const {Title} = Typography;
const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

// @ts-ignore
export const PageContainer = ({title, children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    console.log({foo: router.pathname})

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(x => !x)}>
                <div className="logo">
                    <Title style={{color: "white"}}>Silverspy</Title>
                </div>
                <Divider/>
                <Menu theme="dark" defaultSelectedKeys={[router.pathname]} mode="inline">
                    <Menu.Item key="/" icon={<AreaChartOutlined/>}>
                        <Link href={"/"}>
                            <a>Dashboard</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/payments" icon={<BankOutlined/>}>
                        <Link href={"/payments"}>
                            <a>Payments</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/transactions" icon={<DollarOutlined/>}>
                        <Link href={"/transactions"}>
                            <a>Transactions</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/settings" icon={<SettingOutlined/>}>
                        <Link href={"/settings"}>
                            <a>Settings</a>
                        </Link>
                    </Menu.Item>
                </Menu>
                <Button><a href={"/api/auth/logout"}>Log Out</a></Button>
            </Sider>
            <Layout className="site-layout">
                {/*<Header style={{backgroundColor: "#f0f2f5"}}><Title level={2}>{title}</Title></Header>*/}
                <Content style={{margin: '2rem 1rem'}}>
                    <Title level={2}>{title}</Title>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
