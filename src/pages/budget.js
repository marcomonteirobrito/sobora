import React, { useState, useContext } from 'react';
import { Form, Input, Button, DatePicker,  Switch } from 'antd';

import { IsMobileContext } from '../context/IsMobileContext';
import styles from '../styles/Pages/Budget.module.scss'

export default function Budget() {
  const { isMobile } = useContext(IsMobileContext)
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  return (
    <div className={styles.container}>
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
      style={isMobile ? {width: '80%'} : {width: '40%'}}
    >
      <Form.Item label="Seu nome completo" required>
        <Input />
      </Form.Item>
      <Form.Item
        label="Destino desejado"
        required
      >
        <Input />
      </Form.Item>
      <Form.Item>
      <DatePicker.RangePicker style={{ width: '70%' }} />
      </Form.Item>

      <span>Valores que deseja gastar na sua experiencia</span>
      <Input.Group className={styles.group}>
      <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimo" />
      <Input
        className="site-input-split"
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
        }}
        placeholder="~"
        disabled
      />
      <Input
        className="site-input-right"
        style={{
          width: 100,
          textAlign: 'center',
        }}
        placeholder="Maximo"
      />
    </Input.Group>

    <Form.Item
        label="Seu melhor email"
        required
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Destino desejado"
        required
      >
        <Input />
      </Form.Item>
    <Form.Item
        label="Observacoes extras"
        required
      >
        <Input />
      </Form.Item>
      <Form.Item label="Gostaria de receber orcamento de viagens semelhantes ?" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" size='large' style={{width: "100%"}}>Enviar</Button>
      </Form.Item>
    </Form>
    </div>
  );
};