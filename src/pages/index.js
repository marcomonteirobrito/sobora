import Head from "next/head";
import axios from 'axios'
import React, { useContext, useState } from 'react';
import { Spin } from 'antd';
import { Form, Input, Button, DatePicker,  Switch, message } from 'antd';

import { IsMobileContext } from '../context/IsMobileContext';
import styles from '../styles/Pages/Budget.module.scss'
import moment from "moment";

export default function Home() {
  const { isMobile } = useContext(IsMobileContext)
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)

  function disabledDate(current) {
    return current && current < moment().endOf('day');
  }

  const dateFormat = 'DD/MM/YYYY';

  const sendMail = async (form) => {  
    setLoading(true)
    const dateGoing = form.datas[0]._d
    const dateReturn = form.datas[1]._d

    const parsedDateGoing = moment(dateGoing).format('DD/MMMM/YYYY')
    const parsedDateReturn = moment(dateReturn).format('DD/MMMM/YYYY')

  
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
  setLoading(false)
  }).catch(err => {
  message.error('Erro no envio, tente novamente ou entre em contato');
  setLoading(false)
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
      <Form.Item label="Seu nome completo" required rules={[{ required: true, message: 'Informe seu nome' }]} name='nome'>
        <Input />
      </Form.Item>
      <Form.Item
        label="Origem de partida"
        name='origem'
      ><Input /></Form.Item>
      <Form.Item
        label="Destino desejado"
        rules={[{ required: true, message: 'Informe o destino' }]}
        name='destino'
        required
      >
        <Input />
      </Form.Item>
      <Form.Item label='Periodo que deseja viajar' required rules={[{ required: true, message: 'Informe as datas' }]} name='datas'>
      <DatePicker.RangePicker style={{ width: '70%' }}  disabledDate={disabledDate} format={dateFormat} />
      </Form.Item>

    <Form.Item
        label="Seu melhor email"
        required
        name='email'
        rules={[{ required: true, message: 'Informe seu email' }]}
      >
        <Input />
      </Form.Item>
    <Form.Item
        label="Observacoes extras"
        name='observacoes'
      >
        <Input />
      </Form.Item>
      <Form.Item label="Gostaria de receber orcamento de viagens semelhantes ?" valuePropName="checked" name="aceitaSemelhante">
        <Switch />
      </Form.Item>

      <div className={styles.button}>
        {loading ? <Spin /> : <Button type="primary" size='large' style={{width: "100%"}} htmlType='submit'>Enviar</Button>}
      
      </div>
    </Form>
    </div>
  </>
  );
};