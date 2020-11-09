import React from 'react'
import { Row, Empty, Col } from 'antd';

function NotFound() {
  return (
    <Row justify="center" align="middle" style={{ height: "100%" }}>
      <Col>
        <Empty description="404 Not Found" />
      </Col>
    </Row>
  )
}

export default NotFound