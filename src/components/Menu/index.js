import { Menu } from "antd";
import {
  PoundOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Link from 'next/link'

const { SubMenu } = Menu;

export const MenuResponsive = () => {
  return (
    <Menu
        style={{ width: '100%' }}
        mode='horizontal'
        theme='dark'
      >
        <Menu.Item key="budget" icon={<PoundOutlined />}>
          Orcamento
        </Menu.Item>
        <SubMenu key="contact" icon={<MailOutlined />} title="Contato">
          <Menu.Item key="contact1"><Link href="https://wa.me/5538999299640"><a target="_blank">Whatsapp</a></Link></Menu.Item>
          <Menu.Item key="contact3"><Link href="https://instagram.com/soborafaci?utm_medium=copy_link"><a target="_blank">Instagram</a></Link></Menu.Item>
        </SubMenu>
      </Menu>

  );
};

