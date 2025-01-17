import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Table } from "antd";

const App = () => {
  const [form] = Form.useForm();
  const [UserDataSource, setUserDataSource] = useState([]);

  const getRegisteredUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/");
      const data = await response.json();
      setUserDataSource(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRegisteredUsers();
  }, []);

  const addUser = async (values: any) => {
    try {
      await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      getRegisteredUsers();
      form.resetFields();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (primary_key: number) => {
    try {
      await fetch("http://127.0.0.1:8000/api/delete/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ primary_key }),
      });
      getRegisteredUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "age",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Actions",
      render: (_: any, record: any) => {
        return (
          <Space>
            <Button
              type="primary"
              danger
              onClick={() => deleteUser(record.primary_key)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Space direction="vertical" style={{ display: "flex", width: "100%" }}>
      <h1>Registration Page</h1>
      <Space
        direction="vertical"
        align="center"
        style={{ paddingTop: "1em" }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={addUser}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              { required: true, message: "Please input your Phone Number!" },
            ]}
          >
            <Input type="number" maxLength={10} />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={UserDataSource} />
      </Space>
    </Space>
  );
};

export default App;
