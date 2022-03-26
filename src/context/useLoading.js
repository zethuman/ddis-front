import React from 'react'
import PropTypes from 'prop-types'

const loadingContext = React.createContext()

function useProvideLoading() {
  const [display, setDisplay] = React.useState(false)

  const showLoading = () => {
    setDisplay(true)
  }

  const hideLoading = () => {
    setDisplay(false)
  }

  return { display, showLoading, hideLoading }
}

export function ProvideLoading({ children }) {
  const loading = useProvideLoading()
  return (
    <loadingContext.Provider value={loading}>
      {children}
    </loadingContext.Provider>
  )
}

export const useLoading = () => {
  return React.useContext(loadingContext)
}

ProvideLoading.propTypes = {
  children: PropTypes.node.isRequired
}
