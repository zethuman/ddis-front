import React, { useEffect, useState } from "react";
import { getLocalImages, pushLocalImage } from "../api";
import { Layout, Button, Table, Input, Dropdown, Divider, message } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Content, Sider } = Layout;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled(Input)`
  width: 256px;
`;

const CreatedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const UserImages = () => {
  document.title = "UserImages";

  const [userImagesList, setUserImagesList] = useState(null);
  const [searchList, setSearchList] = useState(null);
  const [searchImageName, setSearchImageName] = React.useState(null);

  React.useEffect(() => {
    // const descriptiveAuthors = userImagesList.map((image) => {
    //   return {
    //     id: author.id,
    //     name: author.name,
    //     photo: author.photo,
    //   };
    // });
    // let searchArray = descriptiveAuthors;
    let searchArray = userImagesList;

    if (searchImageName) {
      searchArray = searchArray.filter((image) => {
        return image.RepoTags[0]?.toLowerCase().includes(searchImageName);
      });
    }

    setSearchList(searchArray);
  }, [userImagesList, searchImageName]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     getLocalImages().then((response) => {
  //       console.log(response);
  //       if (response === "err") {
  //         console.log("got err");
  //       } else {
  //         setUserImagesList(response.data);
  //       }
  //     });
  //   }, 5000);
  //   return () => clearInterval(intervalId);
  // }, []);
  useEffect(() => {
    if (userImagesList === null) {
      getLocalImages().then((response) => {
        if (response === "err") {
          console.log("got err");
        } else {
          setUserImagesList(response.data);
        }
      });
    }
  }, []);

  // const actions = (
  //   <Divider type="vertical">
  //     <Button key="1">Push to IPFS</Button>
  //     <Button key="2">Push to IPFS</Button>
  //     <Button key="3">Push to IPFS</Button>
  //   </Divider>
  // );

  const onClickPush = (item) => {
    const nameNtag = item.RepoTags[0].split(":");
    const body = {
      name: nameNtag[0],
      tag: nameNtag[1],
    };
    message.loading("Trying our best...")
    pushLocalImage(body).then((response) => {
      if (response === "err") {
        message.error("Oops, something went wrong!")
        console.log(response);
        console.log("got err");
      } else {
        message.success("Successfully pushed to IPFS storage");
      }
    });
  };

  const columns = [
    {
      title: "NAME",
      width: "15%",
      render: (item) => {
        return <>{item.RepoTags[0].split(":")[0]}</>;
      },
    },
    {
      title: "TAG",
      width: "15%",
      render: (item) => {
        return <>{item.RepoTags[0].split(":")[1]}</>;
      },
    },
    {
      title: "IMAGE ID",
      width: "14%",
      render: (item) => {
        return <>{item.Id.split(":")[1].substring(0, 11)}</>;
      },
    },
    {
      title: "Created",
      width: "5%",
      render: (item) => {
        return (
          <CreatedDiv>
            <div>
              {item.Created.substring(0, 4)}.{item.Created.substring(5, 7)}.
              {item.Created.substring(8, 10)}
            </div>
            <div>{item.Created.substring(11, 16)}</div>
          </CreatedDiv>
        );
      },
    },
    {
      title: "ACTION",
      width: "20%",
      render: (item) => (
        <Button onClick={() => onClickPush(item)}>Push to IPFS</Button>
      ),
    },
  ];

  return (
    // <>
    //   {userImagesList.map((item) => (
    //     <p key={item.Id}>{item.RepoTags[0]}</p>
    //   ))}
    // </>
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          position: "fixed",
          top: "7%",
          left: 0,
          bottom: 0,
        }}
      ></Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Table
            dataSource={searchList}
            columns={columns}
            rowKey={(item) => item.Id}
            title={() => (
              <StyledHeaderContainer>
                <StyledInput
                  prefix={<SearchOutlined />}
                  placeholder="Search"
                  onChange={(e) => {
                    setSearchImageName(e.target.value.toLowerCase());
                  }}
                />
              </StyledHeaderContainer>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserImages;