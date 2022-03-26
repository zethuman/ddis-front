import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledDiv = styled.div`
  width: 80px;
  height: 80px;
  border: 8px solid #1890ff;

  ${props =>
    props.size === 'small' &&
    `
      width: 40px; 
      height: 40px; 
      border: 4px solid #1890ff;
  `};

  box-sizing: border-box;
  border-radius: 50%;
  border-top: 8px solid transparent;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Spinner = ({ size }) => {
  return <StyledDiv size={size} />
}

Spinner.propTypes = {
  size: PropTypes.string
}

Spinner.defaultProps = {
  size: 'default'
}

export default Spinner
