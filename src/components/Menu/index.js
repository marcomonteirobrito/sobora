import { Menu } from "antd";
import {
  InfoCircleOutlined,
  PoundOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { SiYourtraveldottv } from "react-icons/si";
import { useRouter } from 'next/router'

const { SubMenu } = Menu;

export const MenuResponsive = () => {
  const router = useRouter()

  return (

    <Menu
        style={{ width: '100%' }}
        defaultSelectedKeys={['home']}
        mode='horizontal'
        theme='dark'
      >
        <Menu.Item key="home" icon={<InfoCircleOutlined />} onClick={() => router.push('/')}>
          Inicio
        </Menu.Item>
        <Menu.Item key="budget" icon={<PoundOutlined />} onClick={() => router.push('/budget')}>
          Orcamento
        </Menu.Item>
        <Menu.Item key="about" icon={<InfoCircleOutlined />}>
          Sobre
        </Menu.Item>
        <Menu.Item key="discovery" icon={<SiYourtraveldottv />}>
          Descubra
        </Menu.Item>
        <SubMenu key="contact" icon={<MailOutlined />} title="Contato">
          <Menu.Item key="contact1">Whatsapp</Menu.Item>
          <Menu.Item key="contact2">Email</Menu.Item>
          <Menu.Item key="contact3">Instagram</Menu.Item>
        </SubMenu>
      </Menu>

  );
};

