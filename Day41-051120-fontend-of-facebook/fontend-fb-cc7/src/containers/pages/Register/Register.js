import React from 'react';
import { Row, Col, Button, Form, Input, Tooltip, Divider } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "../../../config/axios";
import { BASE_BACKEND_URL } from '../../../config/constants';

const layout = {
  labelCol: { xs: 24, sm: 5, md: 4, lg: 5, xl: 5, xxl: 5 },
  wrapperCol: { xs: 24, sm: 19, md: 20, lg: 19, xl: 19, xxl: 19 },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

function Register() {
  const onFinish = ({ username, password, nickname: name }) => {
    // axios.post({ username, password, name })
    //   .then()
    //   .catch();
  };

  const props = {
    name: 'img',
    multiple: false,
    action: `${BASE_BACKEND_URL}/uploads/`,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Row justify="center">
      <Col span={16} className="Form">
        <Row justify="center">
          <img style={{ maxHeight: "132px", margin: "50px" }} src="https://www.facebook.com/images/fb_icon_325x325.png" alt="logo" />
        </Row>
        <Divider />
        <Row>
          <Form
            style={{ width: "100%", padding: "20px" }}
            {...layout}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="nickname"
              label={
                <span>
                  Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </Row>
  );
}

export default Register;