import Head from "next/head";
import axios from "axios";
import React, { useContext, useState } from "react";
import { InputNumber } from "antd";
import { ConfigProvider } from "antd";
import { Spin } from "antd";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Switch,
  message,
  Radio,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/pt-br";
import locale from "antd/lib/locale/pt_BR";

import { IsMobileContext } from "../context/IsMobileContext";
import styles from "../styles/Pages/Budget.module.scss";

export default function Home() {
  const { isMobile } = useContext(IsMobileContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { TextArea } = Input;

  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }

  const dateFormat = "DD/MM/YYYY";

  const initialQuantity = 1;
  const initialType = "voo";

  const sendMail = async (form) => {
    setLoading(true);
    const dateGoing = form.datas[0]._d;
    const dateReturn = form.datas[1]._d;

    const parsedDateGoing = moment(dateGoing).format("DD/MMMM/YYYY");
    const parsedDateReturn = moment(dateReturn).format("DD/MMMM/YYYY");

    const mail = {
      service_id: "client_contact",
      template_id: "CONTACT_FORM",
      user_id: "user_l59sCh4Xn57hN4RUhJoJT",
      template_params: {
        tipo: form.tipo,
        nome: form.nome,
        email: form.email,
        origem: form.origem,
        destino: form.destino,
        paradas: form.paradas,
        ida: parsedDateGoing,
        volta: parsedDateReturn,
        quantidade: form.quantidade,
        observacoes: form.observacoes,
        aceitaSemelhante: form.aceitaSemelhante ? "sim" : "nao",
      },
    };

    await axios({
      method: "post",
      url: "https://api.emailjs.com/api/v1.0/email/send",
      data: mail,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        message.success("Enviado com sucesso");
        setLoading(false);
      })
      .catch((err) => {
        message.error("Erro no envio, tente novamente ou entre em contato");
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Orçamento | Só Bora</title>
      </Head>

      <div className={styles.container}>
        <Form
          form={form}
          layout="vertical"
          requiredMark
          onFinish={sendMail}
          style={isMobile ? { width: "80%" } : { width: "40%" }}
        >
          <Form.Item name="tipo" required initialValue={"voo"}>
            <Radio.Group defaultValue={"voo"}>
              <Radio value="voo">Voo</Radio>
              <Radio value="hotel">Hotel</Radio>
              <Radio value="completo">Voo + Hotel</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Seu nome completo"
            required
            rules={[{ required: true, message: "Informe seu nome" }]}
            name="nome"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Seu melhor email"
            required
            name="email"
            rules={[{ required: true, message: "Informe seu email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Origem" name="origem">
            <Input />
          </Form.Item>

          <Form.Item
            label="Destino"
            rules={[{ required: true, message: "Informe o destino" }]}
            name="destino"
            required
          >
            <Input />
          </Form.Item>

          <Form.List name="paradas">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "Paradas nos seguintes destinos" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item {...field} noStyle>
                      <Input
                        placeholder="Nome do destino"
                        style={{ width: "60%", marginRight: "8px" }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "100%" }}
                    icon={<PlusOutlined />}
                  >
                    Adicionar destino
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <ConfigProvider locale={locale}>
            <Form.Item
              label="Período"
              required
              rules={[{ required: true, message: "Informe as datas" }]}
              name="datas"
            >
              <DatePicker.RangePicker
                locale={locale}
                style={{ width: "70%" }}
                disabledDate={disabledDate}
                format={dateFormat}
              />
            </Form.Item>
          </ConfigProvider>

          <Form.Item
            label="Quantidade de pessoas"
            name="quantidade"
            initialValue={1}
          >
            <InputNumber min={1} defaultValue={1} />
          </Form.Item>

          <Form.Item label="Observações" name="observacoes">
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Gostaria de receber orçamentos de viagens semelhantes ?"
            valuePropName="checked"
            name="aceitaSemelhante"
          >
            <Switch />
          </Form.Item>

          <div className={styles.button}>
            {loading ? (
              <Spin />
            ) : (
              <Button
                type="primary"
                size="large"
                style={{ width: "100%" }}
                htmlType="submit"
              >
                Enviar
              </Button>
            )}
          </div>
        </Form>
      </div>
    </>
  );
}
