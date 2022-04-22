import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Table, Input, message, Modal } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {
  getLocalImages,
  localPushedImages,
  pushLocalImage,
  postLocalImage,
  getCommunityImage,
} from "../api";

import { useLoading } from "../context/useLoading";
// import Loading from "../shared/Loading";

// const { Content, Sider } = Layout;

// const ContentContainer = styled.div`
//   background-color: #E5E5E5;
// `;

const Main = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  margin-right: 2%;
  margin-left: 2%;
  width: 70%;
`;

const StyledHeaderContainer = styled.div`
  margin-left: 10%;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled(Input)`
  width: 300px;
  border-radius: 8px;
`;

const CreatedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const OuterImageDiv = styled.div`
  display: flex;
  gap: 7px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const InnerImageDiv = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
`;

const ImageStaticDiv = styled.div`
  flex-basis: 35%;
`;

const ImageDataDiv = styled.div`
  flex-basis: 65%;
`;

const UserImages = () => {
  document.title = "UserImages";

  const { showLoading, hideLoading } = useLoading();
  const [pushedImagesCount, setPushedImagesCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [changeModalVisible, setChangeModalVisible] = useState(false);
  const [chosenImage, setChosenImage] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const [userImagesList, setUserImagesList] = useState(null);
  const [searchList, setSearchList] = useState(null);
  const [searchImageName, setSearchImageName] = React.useState(null);

  React.useEffect(() => {
    let searchArray = userImagesList;

    if (searchImageName) {
      searchArray = searchArray.filter((image) => {
        return image.name?.toLowerCase().includes(searchImageName);
      });
    }

    setSearchList(searchArray);
  }, [userImagesList, searchImageName]);

  useEffect(() => {
    // console.log("useEffect count", pushedImagesCount);
    // if (userImagesList === null) {
    const pushedImages = {};
    localPushedImages().then((response) => {
      if (response === "err") {
        console.log("got err");
      } else {
        response.data.all.map((item) => {
          pushedImages[item.fields.image_id] = {
            hash: item.fields.ipfs_hash,
            name: item.fields.imagename,
            tag: item.fields.tag,
          };
        });
      }
      setPushedImagesCount(response.data.all.length);
    });
    getLocalImages().then((response) => {
      if (response === "err") {
        console.log("got err");
      } else {
        const dataRaw = response.data.map((item) => {
          if (item.RepoTags.length !== 0) {
            const nameNtag = item.RepoTags[0].split(":");
            return { ...item, name: nameNtag[0], tag: nameNtag[1] };
          } else if (item.RepoDigests.length) {
            const name = item.RepoDigests[0].split("@")[0];
            return { ...item, name: name, tag: "<none>" };
          } else {
            return { ...item, name: "<none>", tag: "<none>" };
          }
        });
        const data = dataRaw.map((item) => {
          if (item.Id in pushedImages) {
            item.hash = pushedImages[item.Id].hash;
            return item;
          } else {
            return item;
          }
        });
        setUserImagesList(dataRaw);
      }
    });
    // }
  }, [pushedImagesCount]);

  const handlePush = () => {
    const body = {
      name: chosenImage.name,
      tag: chosenImage.tag,
    };
    console.log(body);
    showLoading();

    // loadingRequest(body).then((response) => {
    //   console.log(response);
    //   hideLoading();

    //   console.log("imageCount", pushedImagesCount)
    //   setPushedImagesCount(pushedImagesCount + 1);
    //   toast.error("request success");

    // });

    pushLocalImage(body).then((response) => {
      if (response === "err") {
        // message.error("Oops, something went wrong!");
        toast.error("Oops, something went wrong!");
        console.log(response);
        console.log("got err");
      } else {
        body.metadata = { description: imageDescription };
        body.hash = response.data.ipfs_hash;
        console.log("response", response);
        console.log("body", body);
        postLocalImage(body).then((responsePost) => {
          hideLoading();
          if (responsePost === "err") {
            // message.error("Oops, something went wrong!");
            toast.error("Oops, something went wrong!");
            console.log(responsePost);
            console.log("got err");
          } else {
            toast.success("Successfully pushed");
            setPushedImagesCount(pushedImagesCount + 1);
          }
        });
      }
      hideLoading();
    });
    setChosenImage(null);
    setImageDescription("");
  };

  const getImageDescription = (body) => {
    getCommunityImage(body).then((response) => {
      // console.log(response.data.data);
      if (response === "err" || response.status === 500) {
        console.log("got err");
        // console.log(response)
        message.error("Oops, something went wrong!");
      } else if (response.status === 204) {
        message.info("No data found");
      } else {
        setChosenImage({
          ...body,
          description: response.data.data?.metadata?.description,
        });
        console.log(response.data.data);
        setChangeModalVisible(true);
      }
    });
  };

  const handleChange = () => {
    const body = {
      name: chosenImage.name,
      tag: chosenImage.tag,
      hash: chosenImage.hash,
      metadata: {
        description: imageDescription,
      },
    };
    console.log("body", body);
    showLoading();
    postLocalImage(body).then((response) => {
      hideLoading();
      if (response === "err") {
        toast.error("Oops, something went wrong!");
        console.log(response);
        console.log("got err");
      } else {
        toast.success("Successfully changed");
      }
    });
  };

  const columns = [
    {
      title: "",
      width: "1%",
      render: (item) => {
        return item.hash ? (
          <CopyToClipboard text={`${item.name}:${item.tag}`}>
            <Button onClick={() => message.success("copied")}>Copy</Button>
          </CopyToClipboard>
        ) : (
          <></>
        );
      },
    },
    {
      title: "NAME",
      // width: 40,
      render: (item) => {
        return <>{item.name}</>;
      },
    },
    {
      title: "TAG",
      width: "1%",
      render: (item) => {
        return <>{item.tag}</>;
      },
    },
    {
      title: "IMAGE ID",
      width: "2%",
      render: (item) => {
        return <>{item.Id.split(":")[1].substring(0, 11)}</>;
      },
    },
    {
      title: "Created",
      width: "1%",
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
    // {
    //   title: "HASH",
    //   width: "1%",
    //   render: (item) =>
    //     // <Button onClick={() => handlePush(item)}>Push to IPFS</Button>
    //     item.hash && <>{item.hash}</>,
    // },
    {
      title: "ACTION",
      width: "10%",
      render: (item) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {item.hash ? (
            <Button
              onClick={() => {
                getImageDescription({
                  name: item.name,
                  tag: item.tag,
                  hash: item.hash,
                });
              }}
            >
              Change
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                setModalVisible(true);
                setChosenImage({
                  name: item.name,
                  tag: item.tag,
                });
              }}
            >
              Push
            </Button>
          )}
        </div>
      ),
    },
  ];

  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    <>
      <Main>
        <Content>
          {searchList && (
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
          )}
        </Content>
      </Main>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          title="Image"
          okText="PUSH to IPFS storage"
          cancelText="Close"
          onCancel={() => {
            setModalVisible(false);
          }}
          onOk={() => {
            // console.log(imageDescription);
            // console.log("test", chosenImage)
            setModalVisible(false);
            handlePush();
          }}
        >
          <OuterImageDiv>
            <InnerImageDiv>
              <ImageStaticDiv>NAME :</ImageStaticDiv>
              <ImageDataDiv>{chosenImage.name}</ImageDataDiv>
            </InnerImageDiv>
            <InnerImageDiv>
              <ImageStaticDiv>TAG :</ImageStaticDiv>
              <ImageDataDiv>{chosenImage.tag}</ImageDataDiv>
            </InnerImageDiv>
            <InnerImageDiv>
              <ImageStaticDiv>DESCRIPTION :</ImageStaticDiv>
              <ImageDataDiv>
                <Input.TextArea
                  placeholder="Please, add desctiption of your Image"
                  onChange={(e) => {
                    setImageDescription(e.target.value);
                  }}
                />
              </ImageDataDiv>
            </InnerImageDiv>
          </OuterImageDiv>
          {/* {console.log(chosenImage)} */}
        </Modal>
      )}
      {changeModalVisible && (
        <Modal
          visible={changeModalVisible}
          title="Change pushed image's description"
          onCancel={() => {
            setChangeModalVisible(false);
          }}
          onOk={() => {
            // console.log(imageDescription);
            // console.log("test", chosenImage)
            setChangeModalVisible(false);
            handleChange();
          }}
        >
          <OuterImageDiv>
            <InnerImageDiv>
              <ImageStaticDiv>NAME :</ImageStaticDiv>
              <ImageDataDiv>{chosenImage.name}</ImageDataDiv>
            </InnerImageDiv>
            <InnerImageDiv>
              <ImageStaticDiv>TAG :</ImageStaticDiv>
              <ImageDataDiv>{chosenImage.tag}</ImageDataDiv>
            </InnerImageDiv>
            <InnerImageDiv>
              <ImageStaticDiv>DESCRIPTION :</ImageStaticDiv>
              <ImageDataDiv>
                <Input.TextArea
                  placeholder="Please, add desctiption of your Image"
                  defaultValue={chosenImage && chosenImage?.description}
                  onChange={(e) => {
                    setImageDescription(e.target.value);
                  }}
                />
              </ImageDataDiv>
            </InnerImageDiv>
          </OuterImageDiv>
        </Modal>
      )}
    </>
  );
};

export default UserImages;
