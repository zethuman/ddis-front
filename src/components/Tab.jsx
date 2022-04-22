import React from "react";
import styled from "styled-components";

import { Tabs } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import UserImages from "./UserImages";
import CommunityImages from "./CommunityImages"

const { TabPane } = Tabs;

const TabsWrapper = styled.div`
  background-color: #FFFFF;
`;

const Tab = () => {
  return (
    <TabsWrapper>
      <Tabs style={{ backgroundColor: "#FFFFF" }} defaultActiveKey="2" centered>
        <TabPane
          tab={
            <span>
              <UserOutlined />
              Community
            </span>
          }
          key="1"
        >
          <CommunityImages></CommunityImages>
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
    </TabsWrapper>
  );
};

export default Tab;
