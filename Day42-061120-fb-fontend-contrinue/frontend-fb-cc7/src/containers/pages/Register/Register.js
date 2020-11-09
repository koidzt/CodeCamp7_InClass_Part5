import React, { useState } from 'react';
import { Row, Col, Button, Form, Input, Tooltip, Divider, message, notification } from "antd";
import { InboxOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import axios from "../../../config/axios";
import { BASE_BACKEND_URL } from '../../../config/constants';
import Dragger from 'antd/lib/upload/Dragger';
import { withRouter } from "react-router-dom";

const layout = {
  labelCol: { xs: 24, sm: 5, md: 4, lg: 5, xl: 5, xxl: 5 },
  wrapperCol: { xs: 24, sm: 19, md: 20, lg: 19, xl: 19, xxl: 19 },
};

function Register(props) {
  const [fileName, setFileName] = useState("");

  const onFinish = ({ username, password, nickname: name }) => {
    axios.post("/users/register", { username, password, name, profileUrl: fileName })
      .then(res => {
        notification.success({
          description: "Signup successfully"
        }); 
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        notification.error({
          description: "Something went wrong."
        });
      });
  };

  const propsUpload = {
    name: 'img',
    multiple: false,
    action: `${BASE_BACKEND_URL}/uploads/`,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setFileName(info.file.response.url);
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
            <div>
              <Dragger {...propsUpload}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                  band files
              </p>
              </Dragger>
            </div>
            <Row justify="center" style={{ marginTop: "10px" }}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Row>
          </Form>
        </Row>
      </Col>
    </Row>
  );
}

export default withRouter(Register);