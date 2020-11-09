import React from 'react';
import { Button, Col, Form, Input, notification, Row } from "antd";
import axios from '../../../config/axios';
import LocalStorageService from "../../../services/LocalStorageService";

function Login(props) {
  const onFinish = (values) => {
    axios.post("/users/login", {
      username: values.username,
      password: values.password
    })
      .then(res => {
        notification.success({
          description: "Login success."
        });
        LocalStorageService.setToken(res.data.token);
        props.setRole("USER");
      })
      .catch(err => {
        console.log(err);
        notification.error({
          description: "Login failed."
        });
      });
  };

  return (
    <Row justify="center">
      <Col xs={20} md={14} lg={9}>
        <img style={{ maxHeight: "132px", margin: "50px" }} src="https://www.facebook.com/images/fb_icon_325x325.png" alt="logo" />
        <Form
          labelCol={{ xs: 24, sm: 5, md: 4, lg: 5, xl: 5, xxl: 5 }}
          wrapperCol={{ xs: 24, sm: 19, md: 20, lg: 19, xl: 19, xxl: 19 }}
          onFinish={onFinish}
          className="Form"
          style={{ padding: "20px" }}
        >
          <Form.Item
            name="username"
            label="Username"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
          >
            <Input.Password />
          </Form.Item>
          <Row justify="center">
            <Button htmlType="submit">Login</Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;

//แบบแต่งเอง
// import React from 'react';
// import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

// function Login() {

//   return (
//     <Row justify="center" style={{ height: "100%" }}>
//       <Col span={12} justify="center" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "50px" }}>
//         <img src="https://www.facebook.com/images/fb_icon_325x325.png" alt="logo" />
//       </Col>
//       <Col span={12} justify="center" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "50px" }}>
//         <Form
//           name="normal_login"
//           className="login-form"
//           initialValues={{ remember: true }}
//           onFinish={() => { }}
//         >
//           <Form.Item
//             name="username"
//             rules={[{ required: true, message: 'Please input your Username!' }]}
//           >
//             <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: 'Please input your Password!' }]}
//           >
//             <Input
//               prefix={<LockOutlined className="site-form-item-icon" />}
//               type="password"
//               placeholder="Password"
//             />
//           </Form.Item>

//           <Form.Item>
//             <p>
//               <Button type="primary" htmlType="submit" className="login-form-button">
//                 Log in
//             </Button>
//               Or <a href="">register now!</a>
//             </p>
//           </Form.Item>
//         </Form>
//       </Col>
//     </Row>
//   )
// }

// export default Login