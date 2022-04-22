import React from 'react'
import styled from 'styled-components'
import { useLoading } from './useLoading'
import Spinner from '../shared/Spinner'

const MainContainer = styled.div`
  z-index: 1000;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 241, 231, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Text = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #000000;
  margin-top: 40px;
`

function LoadingDialog() {
  const { display } = useLoading()

  return (
    display && (
      <MainContainer>
        <Spinner />
        <Text>Please wait...</Text>
      </MainContainer>
    )
  )
}

export default LoadingDialog
