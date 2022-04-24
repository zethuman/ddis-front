import React from "react";
import styled from "styled-components";

import { Tabs } from "antd";
import { GlobalOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import UserImages from "./UserImages";
import CommunityImages from "./CommunityImages";
import Logo from "../static/icons/Logo";

const { TabPane } = Tabs;

const TabsWrapper = styled.div`
  background-color: #FFFFF;
`;

const Tab = () => {
  const [identityModalVisible, setIdentityModalVisible] = React.useState(false);

  return (
    <>
      <TabsWrapper>
        <Tabs
          tabBarExtraContent={{
            left: (
              <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                <Logo />
              </div>
            ),
            right: (
              <div
                style={{ paddingRight: "50px", marginTop: "5px" }}
                onClick={() => {}}
              >
                <UserOutlined />
              </div>
            ),
          }}
          style={{ backgroundColor: "#FFFFF" }}
          defaultActiveKey="2"
          centered
        >
          <TabPane
            tab={
              <span>
                <GlobalOutlined />
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
    </>
  );
};

export default Tab;
