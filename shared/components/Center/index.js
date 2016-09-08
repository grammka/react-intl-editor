import React from 'react'

import CSSModules from 'react-css-modules'
import style from './style'


const Center = ({ styles, children, maxWidth, ...rest }) => {
  const style = {
    maxWidth
  }

  return (
    <div { ...rest } styleName="container" style={ style }>{ children }</div>
  )
}


export default CSSModules(Center, style)
