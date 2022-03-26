import React from 'react'
import styled from 'styled-components'
import NotFoundIcon from '../assets/ErrorPages/NotFound.svg'

const NotFound = styled.div`
  height: 100vh;
  background-color: black;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const NotFoundCard = styled.div`
  background-color: #fff;
  width: 450px;
  height: 450px;
  box-shadow: 10px 10px 10px #888888;
  position: absolute;

  @media (max-width: 500px) {
    width: 90%;
  }
`

const DirectButton = styled.a`
  width: 90%;
  margin: 0px 5%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  height: 70px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #3b464c;
  &:hover {
    background-color: grey;
    color: #000;
  }

  @media (max-width: 768px) {
    height: auto;
    font-size: 16px;
    padding: 14px 0 14px 0;
  }
`;

const NotFoundText = styled.h1`
  margin: 30px 16px;
  font-weight: bolder;
`

const Img = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 45px;

  @media (max-width: 391px) {
    margin-bottom: 26px;
  }
`

const NotFoundPage = () => {
  document.title = 'Error 404'
  return (
    <NotFound>
      <NotFoundCard>
        <NotFoundText>Page Not Found</NotFoundText>
        <Img src={NotFoundIcon} />
        <DirectButton href={'/'}>Go Back</DirectButton>
      </NotFoundCard>
    </NotFound>
  )
}

export default NotFoundPage
