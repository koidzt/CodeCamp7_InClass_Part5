import { Button, Col, Dropdown, Menu, notification, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../config/axios';

function Profile() {
  const { id } = useParams();
  const [person, setPerson] = useState({});

  const fetchData = () => {
    axios.get(`/users/${id}`)
      .then(res => setPerson(res.data));
  };

  useState(() => {
    fetchData();
  }, []);

  const acceptRequest = () => {
    axios.put(`/friends/accept/${id}`)
      .then(res => {
        notification.success({
          description: `ส่งคำขอร้องคุณ ${person.targetUser?.name} เรียบร้อยแล้ว`
        });
        fetchData();
      });
  };

  const cancelRequest = () => {
    axios.delete(`/friends/cancel/${id}`)
      .then(res => {
        notification.success({
          description: `ยกเลิกคำขอเป็นเพื่อนคุณ ${person.targetUser?.name} เรียบร้อยแล้ว`
        });
        fetchData();
      });
  };

  const sendRequest = () => {
    axios.post(`/friends/${id}`)
      .then(res => {
        notification.success({
          description: `ส่งคำขอร้องคุณ ${person.targetUser?.name} เรียบร้อยแล้ว`
        });
        fetchData();
      });
  };

  const deleteFriend = () => {
    axios.delete(`/friends/${id}`)
      .then(res => {
        notification.success({
          description: `ลบคุณ ${person.targetUser?.name} เรียบร้อยแล้ว`
        });
        fetchData();
      });
  };

  const denyRequest = () => {
    axios.delete(`/friends/deny/${id}`)
      .then(res => {
        notification.success({
          description: `ยกเลิกคำขอเป็นเพื่อนคุณ ${person.targetUser?.name} เรียบร้อยแล้ว`
        });
        fetchData();
      });
  };

  return (
    <Row>
      <Col span={8}><Avatar size={250} src={person.targetUser?.profile_url} /></Col>
      <Col span={8} style={{ fontSize: "96px" }}>{person.targetUser?.name}</Col>
      <Col span={8}>{(() => {
        switch (person.message) {
          case "เพื่อน":
            const menu1 = (
              <Menu>
                <Menu.Item>
                  <div onClick={deleteFriend}>
                    ลบเพื่อน
                  </div>
                </Menu.Item>
              </Menu>
            );
            return (
              <Dropdown overlay={menu1} placement="bottomLeft">
                <Button>เพื่อน</Button>
              </Dropdown>
            );
          case "เพิ่มเพื่อน":
            return (
              <Button onClick={sendRequest}>เพิ่มเพื่อน</Button>
            );
          case "ตอบรับคำขอเป็นเพื่อน":
            const menu2 = (
              <Menu>
                <Menu.Item>
                  <div onClick={acceptRequest}>
                    ตอบรับคำขอเป็นเพื่อน
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div onClick={denyRequest}>
                    ปฏิเสธคำขอเป็นเพื่อน
                  </div>
                </Menu.Item>
              </Menu>
            );
            return (
              <Dropdown overlay={menu2} placement="bottomLeft">
                <Button>ตอบรับคำขอเป็นเพื่อน</Button>
              </Dropdown>
            );
          case "ส่งคำขอเป็นเพื่อนแล้ว":
            const menu3 = (
              <Menu>
                <Menu.Item>
                  <div onClick={cancelRequest}>
                    ยกเลิก
                  </div>
                </Menu.Item>
              </Menu>
            );
            return (
              <Dropdown overlay={menu3} placement="bottomLeft">
                <Button>ส่งคำขอเป็นเพื่อนแล้ว</Button>
              </Dropdown>
            );
        }
      })()}</Col>
    </Row>
  );
}

export default Profile;
