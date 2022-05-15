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
import { Modal as CustomModal } from "react-modal";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useLoading } from "../context/useLoading";

const MainDiv = styled.div`
  height: 800px;
`;

const OuterDiv = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const HistoryDiv = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  ${"" /* justify-content: center; */}
  ${"" /* align-content: center; */}
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
  const [searchHistory, setSearchHistory] = useState(null);

  React.useEffect(() => {
    searchHistory
      ? localStorage.setItem("history", JSON.stringify(searchHistory))
      : setSearchHistory(
          localStorage.getItem("history") &&
            JSON.parse(localStorage.getItem("history")).map((item) => {
              return { title: item.name + ":" + item.tag, ...item };
            })
        );
  }, [searchHistory]);

  const onClickSearch = () => {
    if (searchImageName.length > 2 && searchImageName.includes(":")) {
      const splitted = searchImageName.split(":");
      if (splitted.length === 2) {
        const body = {
          name: splitted[0],
          tag: splitted[1],
        };
        searchHistory
          ? setSearchHistory([
              { title: body.name + ":" + body.tag, ...body },
              ...searchHistory.slice(0, 10),
            ])
          : setSearchHistory([{ title: body.name + ":" + body.tag, ...body }]);
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

  const onClickHistory = (body) => {
    setSearchHistory([
      { title: body.name + ":" + body.tag, ...body },
      ...searchHistory.slice(0, 9),
    ]);
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
          name: body.name,
          tag: body.tag,
        });
        console.log(response.data.data);
        setModalVisible(true);
      }
    });
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
            </StyledSearchButtonContainer>
          </StyledInputContainer>
        </StyledContentContainer>
        <HistoryDiv>
          {searchHistory && (
            <>
              <div>
                <div
                  style={{
                    fontSize: "large",
                    color: "rgba(171, 171, 171, 1)",
                  }}
                >
                  Search History
                </div>
                <div
                  style={{
                    marginBottom: "10px",
                    fontSize: "x-small",
                    color: "rgba(171, 171, 171, 1)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSearchHistory(null);
                    localStorage.removeItem("history");
                  }}
                >
                  clean
                </div>
              </div>
              {searchHistory.map((item) => (
                <div
                  style={{ cursor: "pointer", marginTop: "5px" }}
                  onClick={() => {
                    onClickHistory({ name: item.name, tag: item.tag });
                  }}
                >
                  {item.title}
                </div>
              ))}
            </>
          )}
        </HistoryDiv>
      </OuterDiv>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          title="Found Image"
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
            <InnerImageDiv>
              <ImageStaticDiv>DESCRIPTION:</ImageStaticDiv>{" "}
              <ImageDataDiv>{foundImage.description}</ImageDataDiv>
            </InnerImageDiv>
          </OuterImageDiv>
        </Modal>
      )}
    </MainDiv>
  );
};

export default CommunityImages;
