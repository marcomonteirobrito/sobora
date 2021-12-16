import { Menu } from "antd";
import {
  InfoCircleOutlined,
  PoundOutlined,
  MailOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { SiYourtraveldottv } from "react-icons/si";
import { useRouter } from 'next/router'
import Link from 'next/link'

const { SubMenu } = Menu;

export const MenuResponsive = () => {
  const router = useRouter()

  return (
    <Menu
        style={{ width: '100%' }}
        mode='horizontal'
        theme='dark'
      >
        <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => router.push('/')}>
          Inicio
        </Menu.Item>
        <Menu.Item key="budget" icon={<PoundOutlined />} onClick={() => router.push('/budget')}>
          Orcamento
        </Menu.Item>
        <Menu.Item key="about" icon={<InfoCircleOutlined />}>
          Sobre
        </Menu.Item>
        <SubMenu key="contact" icon={<MailOutlined />} title="Contato">
          <Menu.Item key="contact1"><Link href="https://wa.me/5538999299640"><a target="_blank">Whatsapp</a></Link></Menu.Item>
          <Menu.Item key="contact2">Email</Menu.Item>
          <Menu.Item key="contact3"><Link href="https://instagram.com/soborafaci?utm_medium=copy_link"><a target="_blank">Instagram</a></Link></Menu.Item>
        </SubMenu>
      </Menu>

  );
};

