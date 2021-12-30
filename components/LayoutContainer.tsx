import React, {useState} from 'react';
import {Layout, Menu, Breadcrumb, Typography, Divider} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    AreaChartOutlined, BankOutlined, DollarOutlined,
} from '@ant-design/icons';

const {Title} = Typography;
const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

// @ts-ignore
const SiderDemo = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(x => !x)}>
                <div className="logo">
                    <Title style={{color: "white"}}>Silverspy</Title>
                </div>
                <Divider />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<AreaChartOutlined/>}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="2" icon={<BankOutlined/>}>
                        Payments
                    </Menu.Item>
                    <Menu.Item key="3" icon={<DollarOutlined/>}>
                        Transactions
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/*<Header className="site-layout-background" style={{padding: 0}}/>*/}
                <Content style={{margin: '2rem 1rem'}}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
export default SiderDemo
