import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Spinner from './Spinner'

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Loading({ size }) {
  return (
    <MainContainer>
      <Spinner size={size} />
    </MainContainer>
  )
}

Loading.propTypes = {
  size: PropTypes.string
}

Loading.defaultProps = {
  size: 'default'
}

export default Loading
