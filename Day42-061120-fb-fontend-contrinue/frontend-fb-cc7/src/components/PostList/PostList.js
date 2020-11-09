import { Col, Row } from 'antd';
import React from 'react';
import Post from '../Post/Post';

function PostList({ postList }) {
  return (
    <Row justify="center">
      {postList.map(post => <Col span={24}><Post post={post} /></Col>)}
    </Row>
  );
}

export default PostList;
