import React from "react";
import styled from "styled-components";

import { Tabs } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import UserImages from "./UserImages";

const { TabPane } = Tabs;

const Tab = () => {
  return (
    <Tabs defaultActiveKey="2" centered>
      <TabPane
        tab={
          <span>
            <UserOutlined />
            Community
          </span>
        }
        key="1"
      >
        Community
      </TabPane>
      <TabPane
        tab={
          <span>
            <HomeOutlined />
            My images
          </span>
        }
        key="2"
      >
        <UserImages></UserImages>
      </TabPane>
    </Tabs>
  );
};

export default Tab;
