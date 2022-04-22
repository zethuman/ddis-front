import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCommunityImage, pullCommunityImage, loadingRequest } from "../api";
import {
  Layout,
  Button,
  Table,
  Input,
  Dropdown,
  Divider,
  message,
  Modal,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useLoading } from "../context/useLoading";

const MainDiv = styled.div`
  height: 800px;
`;

const OuterDiv = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const StyledContentContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
  width: fit-content;
  min-width: 400px;
  min-height: 120px;
  border-radius: 8px;
`;

const StyledInputContainer = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const StyledInput = styled(Input)`
  width: 300px;
  border-radius: 10px;
`;

const StyledSearchButtonContainer = styled.div`
  margin-top: 8px;
  width: fit-content;
`;

const StyledButtonSearch = styled(Button)`
  border-radius: 10px;
`;

// const StyledImageInfoContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

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

const CommunityImages = () => {
  document.title = "CommunityImages";

  const { showLoading, hideLoading } = useLoading();
  const [searchImageName, setSearchImageName] = useState("");
  const [foundImage, setFoundImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onClickSearch = () => {
    if (searchImageName.length > 2 && searchImageName.includes(":")) {
      const splitted = searchImageName.split(":");
      if (splitted.length === 2) {
        const body = {
          name: splitted[0],
          tag: splitted[1],
        };
        // console.log(body)
        getCommunityImage(body).then((response) => {
          // console.log(response.data.data);
          if (response === "err" || response.status === 500) {
            console.log("got err");
            // console.log(response)
            message.error("Oops, something went wrong!");
          } else if (response.status === 204) {
            message.info("No data found");
          } else {
            setFoundImage({
              hash: response.data.data?.hash,
              description: response.data.data?.metadata?.description,
              name: splitted[0],
              tag: splitted[1],
            });
            console.log(response.data.data);
            setModalVisible(true);
          }
        });
      } else {
        message.error("Please search as NAME:TAG");
      }
    } else {
      message.error("Please search as NAME:TAG");
    }
  };

  const handlePull = () => {
    // if (item.RepoTags.length) {
    console.log("found image", foundImage);
    setModalVisible(false);
    const body = {
      hash: foundImage.hash,
    };
    console.log("body", body);

    //   message.loading("Trying our best...");
    showLoading();

    // loadingRequest(body).then((response) => {
    //   console.log(response);
    //   hideLoading();
    //   setModalVisible(true);
    //   toast.error("request success");
    // });
    pullCommunityImage(body).then((response) => {
      if (response === "err") {
        console.log(response);
        console.log("got err");
        hideLoading();
        setModalVisible(true);
        toast.error("Oops, something went wrong!");
      } else {
        hideLoading();
        setModalVisible(true);
        toast.success("Successfully pulled");
      }
    });
  };

  return (
    <MainDiv>
      <OuterDiv>
        <StyledContentContainer>
          <StyledInputContainer>
            <StyledInput
              prefix={<SearchOutlined />}
              placeholder="NAME:TAG"
              onChange={(e) => {
                setSearchImageName(e.target.value.toLowerCase());
              }}
            />
            <StyledSearchButtonContainer>
              {/* <Tooltip title="search"> */}
              <StyledButtonSearch
                type="primary"
                shape="circle"
                style={{ marginLeft: "1%" }}
                onClick={() => onClickSearch()}
              >
                <div style={{ marginLeft: "3px", marginRight: "3px" }}>
                  Search
                </div>
              </StyledButtonSearch>
              {/* </Tooltip> */}
            </StyledSearchButtonContainer>
          </StyledInputContainer>
        </StyledContentContainer>
      </OuterDiv>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          title="Found Image"
          // cancelButtonProps={{ style: { display: "none" } }}
          okText="PULL"
          cancelText="Close"
          onCancel={() => {
            setModalVisible(false);
          }}
          onOk={() => {
            handlePull();
          }}
        >
          <OuterImageDiv>
            <InnerImageDiv>
              <ImageStaticDiv>NAME:</ImageStaticDiv>{" "}
              <ImageDataDiv>{foundImage.name}</ImageDataDiv>
            </InnerImageDiv>
            <InnerImageDiv>
              <ImageStaticDiv>TAG:</ImageStaticDiv>{" "}
              <ImageDataDiv>{foundImage.tag}</ImageDataDiv>
            </InnerImageDiv>
            {/* <InnerImageDiv>
              <ImageStaticDiv>HASH:</ImageStaticDiv>{" "}
              <ImageDataDiv>{foundImage.hash}</ImageDataDiv>
            </InnerImageDiv> */}
            <InnerImageDiv>
              <ImageStaticDiv>DESCRIPTION:</ImageStaticDiv>{" "}
              <ImageDataDiv>{foundImage.description}</ImageDataDiv>
            </InnerImageDiv>
            {/* <Button
              type="primary"
              onClick={() => {
                handlePull();
              }}
            >
              Pull
            </Button> */}
          </OuterImageDiv>
        </Modal>
      )}
    </MainDiv>
  );
};

export default CommunityImages;
