import Head from "next/head";
import axios from 'axios'
import React, { useContext } from 'react';
import { Form, Input, Button, DatePicker,  Switch, message } from 'antd';

import { IsMobileContext } from '../context/IsMobileContext';
import styles from '../styles/Pages/Budget.module.scss'
import moment from "moment";

export default function Home() {
  const { isMobile } = useContext(IsMobileContext)
  const [form] = Form.useForm();

  const sendMail = async (form) => {  
    const dateGoing = form.datas[0]._d
    const dateReturn = form.datas[1]._d

    const parsedDateGoing = moment(dateGoing).format('DD MMMM YYYY')
    const parsedDateReturn = moment(dateReturn).format('DD MMMM YYYY')
  
    const mail = {
    service_id: 'client_contact',
    template_id: 'CONTACT_FORM',
    user_id: 'user_l59sCh4Xn57hN4RUhJoJT',
    template_params: {
      'nome': form.nome,
      'origem': form.origem,
      'destino': form.destino,
      'ida': parsedDateGoing,
      'volta': parsedDateReturn,
      'email': form.email,
      'observacoes': form.observacoes,
      'aceitaSemelhante': form.aceitaSemelhante ? 'sim' : 'nao'
    }
};

  await axios({
    method: 'post',
    url: 'https://api.emailjs.com/api/v1.0/email/send',
    data: mail,
    headers: {
        'content-type': 'application/json'
    }
  }).then(res => {
  message.success('Enviado com sucesso');
  }).catch(err => {
  message.error('Erro no envio, tente novamente ou entre em contato');
  })

  }

  return (
    <><Head>
    <title>Orcamento | Só Bora</title>
  </Head>
  
  <div className={styles.container}>
    <Form
      form={form}
      layout="vertical"
      requiredMark
      onFinish={sendMail}
      style={isMobile ? {width: '80%'} : {width: '40%'}}
    >
      <Form.Item label="Seu nome completo" required name='nome'>
        <Input />
      </Form.Item>
      <Form.Item
        label="Origem de partida"
        name='origem'
      ><Input /></Form.Item>
      <Form.Item
        label="Destino desejado"
        required
        name='destino'
      >
        <Input />
      </Form.Item>
      <Form.Item label='Periodo que deseja viajar' required name='datas'>
      <DatePicker.RangePicker style={{ width: '70%' }}  />
      </Form.Item>

    <Form.Item
        label="Seu melhor email"
        required
        name='email'
      >
        <Input />
      </Form.Item>
    <Form.Item
        label="Observacoes extras"
        required
        name='observacoes'
      >
        <Input />
      </Form.Item>
      <Form.Item label="Gostaria de receber orcamento de viagens semelhantes ?" valuePropName="checked" name="aceitaSemelhante">
        <Switch />
      </Form.Item>
        <Button type="primary" size='large' style={{width: "100%"}} htmlType='submit'>Enviar</Button>
    </Form>
    </div>
  </>
  );
};