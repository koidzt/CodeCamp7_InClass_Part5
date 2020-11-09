import React from "react";
import { Card, Row, Avatar, Col, Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";
import "./Post.css";
import { EllipsisOutlined } from "@ant-design/icons";
import CommentList from "../CommentList/CommentList";

function Post(props) {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="#" style={{ color: "#1D2129" }}>
          แก้ไขโพสต์
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="#" style={{ color: "#1D2129" }}>
          ลบโพสต์
        </Link>
      </Menu.Item>
    </Menu>
  );

  const commentsList = props.commentsList;

  let manageButton = null;

  if (props.isMine) {
    manageButton = (
      <Col style={{ float: "right", paddingRight: "12px" }}>
        <Row justify="end">
          <Link to="#" style={{ color: "#606770" }}>
            <Dropdown
              trigger={["click"]}
              overlay={menu}
              placement="bottomRight"
            >
              <EllipsisOutlined />
            </Dropdown>
          </Link>
        </Row>
      </Col>
    );
  }

  return (
    <Card
      bodyStyle={{ padding: "0" }}
      style={{ width: 500, margin: "0 auto", marginTop: "10px" }}
    >
      <Row style={{ paddingTop: "12px" }}>
        <Col>
          <Avatar
            style={{ margin: "0 8px 0 12px" }}
            size={40}
            src={props.post.User.profile_url}
          />
        </Col>
        <Col style={{ width: "412px" }}>
          <Row>
            <Link to="#" style={{ color: "#385898" }}>
              <strong>{props.post.User.name}</strong>
            </Link>
          </Row>
          <Row title={new Date(props.post.createdAt).toLocaleString()} style={{ fontSize: "12px" }}>
            <Link className="link-datetime" to="#" style={{ color: "#616770" }}>
              {new Date(props.post.createdAt).toDateString()}
            </Link>
          </Row>
        </Col>
        {manageButton}
      </Row>
      <Row
        style={{ marginTop: "12px", paddingLeft: "12px", marginBottom: "12px" }}
      >
        {props.post.caption}
      </Row>
      <Row>
        <img style={{ width: "100%" }} src={props.post.picture_url} />
      </Row>
      <Row>
        <CommentList
          commentsList={props.post.Comments}
        />
      </Row>
    </Card>
  );
}

export default Post;